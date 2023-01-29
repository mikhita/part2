import React, { useState } from "react";

const PhoneBook = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "599123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  function canAddObject(array, newObject) {
    for (let i = 0; i < array.length; i++) {
      if (
        JSON.stringify(array[i].name) === JSON.stringify(newObject.name) ||
        JSON.stringify(array[i].number) === JSON.stringify(newObject.number)
      ) {
        return false;
      }
    }
    return true;
  }

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (!canAddObject(persons, personObject)) {
      alert(`${newName} is already added to phonebook`);
    } else if (personObject.name.length < 2) {
      alert(`phonebook name is empty`);
    } else {
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input
            onChange={handleNameChange}
            value={newName}
            placeholder="write a name..."
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
            placeholder="write a number..."
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name}
            {": "} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneBook;
