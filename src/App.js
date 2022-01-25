import './App.css';
import contactsOrigin from './contacts.json';
import { useState } from "react";

const contactList = contactsOrigin.slice(47, 52)


function App() {

  const [contacts, setContacts] = useState(contactList);

  const addRandomContact = () => {
    const copiedContacts = [...contacts]
    const newContactList = contactsOrigin.slice(0, 47)
    const randomContact = newContactList[Math.floor(Math.random() * newContactList.length)]
    copiedContacts.push(randomContact)
    setContacts(copiedContacts)
  }

  const sortByName = () => {
    const copyToSort = [...contacts];
    copyToSort.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setContacts(copyToSort)
  }

  const sortByPopularity = () => {
    const copyToSort = [...contacts];
    copyToSort.sort((a, b) => b.popularity-a.popularity)
    setContacts(copyToSort)
  }

  const deleteActor = (e) => {
    const copyForDelete = [...contacts];
    let actorDelete = copyForDelete.find(contact => contact.id === e.target.className);
    let indexDelete = copyForDelete.indexOf(actorDelete)
    copyForDelete.splice(indexDelete, 1)
    setContacts(copyForDelete)
  }

  return (
    <div className="App">
    <h1>IronContacts</h1>

    <div className='buttons'>
    <button onClick={addRandomContact}>Add Random Contact</button>
    <button onClick={sortByName}>Sort by name</button>
    <button onClick={sortByPopularity}>Sort by popularity</button>
    </div>

    <table>
    <thead>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won Oscar 🏆</th>
      <th>Won Emmy 🏆</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
      {contacts.map((contact) => {
        return (
          <tr key={contact.name}>
          <td><img src={contact.pictureUrl} alt={contact.name}></img></td> 
          <td>{contact.name}</td>
          <td>{contact.popularity.toFixed(2)}</td>
          {contact.wonOscar ? (<td>{'🏆'}</td>) : (<td>{''}</td>)}
          {contact.wonEmmy ? (<td>{'🏆'}</td>) : (<td>{''}</td>)}
          <td><button onClick={(e) => deleteActor(e)} className={contact.id}>Delete</button></td>
          </tr>
        )
      })}
      </tbody>
    </table>

    </div>
  );
}

export default App;