
import styles from './ContactList.module.css'
import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
export default function ContactList() {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectNameFilter);
    const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
    return (
        <div>
                    <ul className={styles.list}>
            {filteredContacts.map(filteredContact => (
                <Contact
                key={filteredContact.id}
                contact={filteredContact}
                
                />
            ))}
            </ul>
        </div>
    )
}