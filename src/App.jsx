
import { useEffect, useState } from 'react'
import {nanoid} from "nanoid"
import './App.css'

function App() {
  
  const [item,setItem] = useState([]);
  const [text,setText] = useState('');

 useEffect( () => {

  // save items to localStorage
   localStorage.setItem('item', JSON.stringify(item));
  
 },[item] )

 useEffect( () => {
   // delete item
   
   const savedItems = JSON.parse(localStorage.getItem(item));
  if(savedItems){
    setItem(savedItems);
  }


 },[] )



  const addItem = () => {
     if( text.trim() !== ""){
       const timestamp = new Date();
       const newItem = {id : nanoid(),text,timestamp}; 
       setItem([...item, newItem]);
       setText('');
     }
  }

  const deleteItem = (id) => {
     
    const updatedItem = item.filter( (li) => li.id !== id );
    setItem(updatedItem);
  }
  


  return (
    <>
      
      <div className="main">
         <div className="todo-input">
           <h1> Todo Input </h1>
            <form onSubmit={ (e) => {e.preventDefault() ; addItem();}} >
            <input 
             placeholder='Enter task'
             name = "my-input" 
             type="text" 
             value={text} 
             onChange={ (e) => {setText(e.target.value)} } 
           />
          <button type='submit' >Add Item</button> 
            </form>
           
         </div>

         <div className="todo-list">
           <h2>Todo list</h2>
           <ul className='list'>
              {item.map( (item) => {
                return (                
                   <li className='list-item' key={item.id}>
                     {item.text} 
                     <span className='timestamp'>{item.timestamp.toLocaleString()} <button onClick={ () => deleteItem(item.id) } >Del</button></span>
                     
                   </li>            
                )
              } )}
           </ul> 
         </div>

      </div>
    </>
  )
}

export default App;

