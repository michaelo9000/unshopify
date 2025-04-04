import { useState } from "react";

import "./App.css";
import AddItem from "./pages/add-item";
import List from "./pages/list";
import Summary from "./pages/summary";

function App() {
  const [error, setError] = useState();
  const [page, setPage] = useState('list');
  const [editingItem, setEditingItem] = useState();

  function getHeaderText(){
    if (error)
      return error;
    switch (page){
      case "add":
        if (editingItem)
          return "Editing " + editingItem.name;
        return "Add something you want to buy";
      case "list":
        return "Your wishlist";
      case "summary":
        return "The results of your restraint!";
      default: 
        return "Unshopify";
    }
  }

  function editItem(item){
    console.log(item);
    setEditingItem(item);
    setPage('add');
  }

  function finishedEditing(){
    setEditingItem();
    setPage('list');
  }
  
  return (
    <div className="App">
      <div className={`content-row header ${error ? 'error-banner' : ''}`}>
        <span>{getHeaderText()}</span>
        {error && <div className="header-control" onClick={() => setError("")}>X</div>}
      </div>
      <AddItem reportError={setError} isActive={page === 'add'} editing={editingItem} finishedEditing={finishedEditing}/>
      <List reportError={setError} isActive={page === 'list'} editItem={editItem}/>
      <Summary reportError={setError} isActive={page === 'summary'}/>
      <div className="nav">
        <div className={`nav-item add ${page === 'add' ? 'active' : ''}`} onClick={() => setPage('add')}></div>
        <div className={`nav-item list ${page === 'list' ? 'active' : ''}`} onClick={() => setPage('list')}></div>
        <div className={`nav-item summary ${page === 'summary' ? 'active' : ''}`} onClick={() => setPage('summary')}></div>
      </div>
    </div>
  );
}

export default App;