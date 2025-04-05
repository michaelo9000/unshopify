import { db } from "../infra/data";
import { useLiveQuery } from "dexie-react-hooks";

export default function Summary(props){
    const items = useLiveQuery(() => db.items.toArray()) ?? [];
    
    if (!props.isActive) 
        return <></>

    let spent = items
        .filter(i => i.bought)
        .reduce((sum, i) => sum + i.cost*1, 0);

    let saved = items
        .filter(i => i.archived)
        .reduce((sum, i) => sum + i.cost*1, 0);

    let outstanding = items
        .filter(i => !i.bought && !i.archived)
        .reduce((sum, i) => sum + i.cost*1, 0);
    
    return <div className="page-body">
        <p>You have spent</p>
        <h1>${spent}</h1>
        <p>You have saved</p>
        <h1>${saved}</h1>
        <p>Your wishlist costs</p>
        <h1>${outstanding}</h1>
        <p></p>
    </div>
}