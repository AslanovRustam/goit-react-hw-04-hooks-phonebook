import React, { Component } from 'react';
import shortid from 'shortid';
import Form from './Form/Form';
import Contactlist from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    // name: '',
    // number: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // onAddContact = (name, number) => {
  //   console.log({ name, number });
  //   const contact = {
  //     id: shortid.generate(),
  //     name: name,
  //     number: number,
  //   };
  onAddContact = (name, number) => {
    console.log({ name, number });
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    const getContacts = this.state.contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );

    const isGetContactAlready = getContacts.includes(name.toLocaleLowerCase());

    if (isGetContactAlready) {
      alert(`${name} is already in contacts!`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [contact, ...prevState.contacts],
        };
      });
    }
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <Form onSubmit={this.onAddContact} />
        <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        <Contactlist
          // contacts={this.state.contacts}
          contacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </>
    );
  }
}

export default App;
