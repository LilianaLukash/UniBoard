
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList'
import SearchBox from './components/SearchBox/SearchBox'
import './App.css'
function App() {   
    return (
       <div className={"container"}>
      <h2>Phonebook</h2>
      <ContactForm  />
      <SearchBox  />
      <ContactList  />
    </div>
    )
}

export default App
