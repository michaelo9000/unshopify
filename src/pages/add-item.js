import { useState } from "react";

import { db } from "../infra/data";

export default function WordList(props){
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [link, setLink] = useState();
    const [cost, setCost] = useState();
    const [rank, setRank] = useState(1);
    const [editingItem, setEditingItem] = useState();

    let i = props.editing;
    if (i && i !== editingItem){
        setEditingItem(i);
        
        setName(i.name);
        setDescription(i.description);
        setLink(i.link);
        setCost(i.cost);
        setRank(i.rank);
    }

    function addItem(e){
        e.preventDefault();
        if (!name || !link || !cost || rank === 0){
            props.reportError("Fill in all the fields!");
            return;
        }

        if (editingItem){
            editingItem.name = name;
            editingItem.description = description;
            editingItem.link = link;
            editingItem.cost = cost;
            editingItem.rank = rank;
            db.items.put(editingItem);
            setEditingItem();
            props.finishedEditing();
        }
        else {
            db.items.add({name: name, description: description, link: link, cost: cost, rank: rank});
            console.log('added ', name);
        }

        setName();
        setDescription();
        setLink();
        setCost();
        setRank();
    }
    
    if (!props.isActive) 
        return <></>

    return <div className="page-body">
        <form onSubmit={(e) => addItem(e)}>
            <input value={name || ''} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input value={description || ''} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
            <input value={link || ''} onChange={e => setLink(e.target.value)} placeholder="Link" type="url" />
            <input value={cost || ''} onChange={e => setCost(e.target.value)} placeholder="Cost" type="number"/>
            {!editingItem && 
                <>
                <p>How much do you want it, out of five?</p>
                <select onChange={(e) => setRank(e.target.value)} value={rank || 1}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                </>
            }
            <button>{editingItem ? 'SAVE' : 'ADD'}</button>
        </form>
    </div>
}