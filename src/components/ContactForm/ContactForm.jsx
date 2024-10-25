
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../../redux/contactsSlice';

export default function ContactForm() {
  
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

 
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required!'),
    number: Yup.string()
      .matches(/^[0-9]{3}-[0-9]{2}-[0-9]{2}$/, 'Format: 123-45-67')
      .required('Required!'),
  });

  // Функція обробки відправки форми
  const handleSubmit = (values, { resetForm }) => {
    // Перевірка на дублікати
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    // Створюємо новий контакт
    const newContact = {
      id: nanoid(),
      ...values,
    };

    // Відправляємо дію додавання контакту
    dispatch(addContact(newContact));

    // Скидаємо форму
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Name</label>
        <Field className={styles.input} name="name" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label htmlFor="number">Number</label>
        <Field className={styles.input} name="number" />
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button className={styles.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
