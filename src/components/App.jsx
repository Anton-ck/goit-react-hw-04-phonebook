import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import FilterName from './Filter/Filter';
import { Phonebook, PhonebookTitle, PhonebookSubTitle } from './App.styled';

const parseContacts = () => {
  const contacts = localStorage.getItem('contacts');

  try {
    return JSON.parse(contacts) ?? [];
  } catch (error) {
    return [];
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(() => parseContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handlerFormSubmit = ({ name, number }) => {
    const nameNormalized = name.toLowerCase();

    const isNameAlreadyInContacts = contacts.find(
      contact => contact.name.toLowerCase() === nameNormalized
    );

    if (isNameAlreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [
      { id: nanoid(), name, number },
      ...prevContacts,
    ]);
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = idToDelete => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== idToDelete)
    );
  };

  return (
    <Phonebook>
      <PhonebookTitle>PhoneBook</PhonebookTitle>
      <ContactForm onSubmit={handlerFormSubmit} />
      <PhonebookSubTitle>Contacts</PhonebookSubTitle>
      <FilterName
        filterValue={filter}
        handleFilterChange={handleFilterChange}
      />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </Phonebook>
  );
};
