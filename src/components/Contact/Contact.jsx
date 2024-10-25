import styles from './Contact.module.css';
import { IoPersonSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { deleteContact } from '../../redux/contactsSlice';
import { useDispatch } from 'react-redux';

export default function Contact({ contact }) {
    const dispatch = useDispatch();
    return (
        <li className={styles.item}>
            <div> <IoPersonSharp />  {contact.name}</div>
           <div> <FaPhone /> {contact.number} </div>
            <button className={styles.button} onClick={() => dispatch (deleteContact(contact.id))}>Delete</button>
        </li>
    )
}