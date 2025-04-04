import { useLiveQuery } from "dexie-react-hooks";
import { firstBy } from "thenby";

import { db } from "../infra/data";

export default function List(props){
    const items = useLiveQuery(() => db.items.toArray()) ?? [];

    let sortableItems = items.map(i => {return {...i, current: !i.bought && !i.archived}});

    sortableItems.sort(
        firstBy((a, b) => b.current - a.current)
        .thenBy((a, b) => b.bought - a.bought)
        .thenBy((a, b) => b.rank - a.rank)
    )

    function editItem(e, item){
        e.preventDefault();
        console.log('editing ', item.name);
        props.editItem(item);
    }

    function deleteItem(e, item){
        e.preventDefault();
        console.log('deleting ', item.name);
        db.items.delete(item.id);
    }

    function archiveItem(e, item){
        e.preventDefault();
        console.log('archiving ', item.name);
        item.archived = !item.archived;
        db.items.put(item);
    }

    function boughtItem(e, item){
        e.preventDefault();
        console.log('bought ', item.name);
        item.bought = !item.bought;
        db.items.put(item);
    }

    function updateRank(e, item){
        e.preventDefault();
        console.log('updated item rank ', item.name, ' to ', e.target.value);
        item.rank = e.target.value;
        db.items.put(item);
    }
    
    if (!props.isActive) 
        return <></>

    return <div className="page-body">
        {sortableItems.map((i, idx) => 
            <div className="item" key={idx}>
                <div className="content-row">
                    <p className="item-name">
                        <a href={i.link} target="_blank" rel="noreferrer">{i.name}</a>
                    </p>
                    <p className="item-cost">${i.cost}</p>
                    <select className="mini" onChange={(e) => updateRank(e, i)} value={i.rank}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <p className="item-description">{i.description}</p>
                <div className="item-buttons-container">
                    <form className="icon" onSubmit={(e) => deleteItem(e, i)}>
                        <button className="delete"></button>
                    </form>
                    <form className="icon" onSubmit={(e) => editItem(e, i)}>
                        <button className="edit"></button>
                    </form>
                    <form onSubmit={(e) => archiveItem(e, i)}>
                        <button>{i.archived ? 'UNARCHIVE' : 'ARCHIVE'}</button>
                    </form>
                    <form onSubmit={(e) => boughtItem(e, i)}>
                        <button>{i.bought ? 'UNBUY' : 'BOUGHT'}</button>
                    </form>
                </div>
            </div>
        )}
    </div>
}