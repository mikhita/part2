import React, { useEffect, useState } from "react";
import personsServices from "../services/persons";
import AddContact from "./AddContact";
import FilteredName from "./FilteredName";
import NumbersList from "./NumbersList";

const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personsServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "notes");

  const filteredArray = persons.filter((person) =>
    person.name.includes(searchName)
  );

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };
  const handleSearchNameChange = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
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
    };

    if (!canAddObject(persons, personObject)) {
      alert(`${newName} or ${newNumber} is already added to phonebook`);
    } else if (personObject.name.length < 2 || personObject.number.length < 2) {
      alert(`input is requiered`);
    } else {
      personsServices.create(personObject).then((response) => {
        if (personObject.name.length > 2) {
          setPersons(persons.concat(personObject));
        }
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilteredName
        value={searchName}
        handleSearchNameChange={handleSearchNameChange}
        filteredArray={filteredArray}
      />
      <h2>add a new</h2>
      <AddContact
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <NumbersList persons={persons} />
    </div>
  );
};

export default PhoneBook;
