import { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import Form from './Form/Form';
import Contactlist from './Contacts/Contacts';
import Filter from './Filter/Filter';
import s from './app.module.css';

const contactsFirstRender = [
  { id: 'id-1', name: 'Barak Obama', number: '459-12-56' },
  { id: 'id-2', name: 'Donald Trump', number: '443-89-12' },
  { id: 'id-3', name: 'George Washington', number: '645-17-79' },
  { id: 'id-4', name: 'Thomas Jefferson', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContact] = useState(contactsFirstRender);
  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContact(parsedContacts);
      }

      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contactWithId = {
      id: shortid.generate(),
      name,
      number,
    };
    // setContact([contactWithId, ...contacts]);

    const getContacts = contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );

    const isGetContactAlready = getContacts.includes(name.toLocaleLowerCase());

    if (isGetContactAlready) {
      alert(`${name} is already in contacts!`);
      return;
    } else {
      setContact([contactWithId, ...contacts]);
    }
  };

  const onDeleteContact = contactId => {
    setContact(contacts.filter(contact => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <div className={s.mainSection}>
      <Form onSubmit={addContact} />
      <Filter value={filter} onChange={e => setFilter(e.currentTarget.value)} />
      <Contactlist
        // contacts={this.state.contacts}
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}
