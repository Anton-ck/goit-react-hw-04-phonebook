import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import FilterName from './Filter/Filter';
import { Phonebook, PhonebookTitle, PhonebookSubTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handlerFormSubmit = ({ name, number }) => {
    const nameNormalized = name.toLowerCase();

    const isNameAlreadyInContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === nameNormalized
    );

    if (isNameAlreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
      };
    });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  deleteContact = idToDelete => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== idToDelete
        ),
      };
    });
  };
  render() {
    return (
      <Phonebook>
        <PhonebookTitle>PhoneBook</PhonebookTitle>
        <ContactForm onSubmit={this.handlerFormSubmit} />
        <PhonebookSubTitle>Contacts</PhonebookSubTitle>
        <FilterName
          filterValue={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
      </Phonebook>
    );
  }
}
