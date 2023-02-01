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
    async function fetchData() {
      const response = await personsServices.getAll();
      setPersons(response.data);
    }
    fetchData();
  }, []);

  console.log("render", persons.length, "notes");

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
  const filteredArray = persons.filter((person) =>
    person.name.includes(searchName)
  );

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

  const handleDeleteOf = async (id) => {
    const person = persons.find((p) => p.id === id);
    try {
      const deletePerson = { ...person };

      await personsServices.delet(id, deletePerson).then((response) => {
        if (
          window.confirm(`Do you really want to delete ${deletePerson.name} ?`)
        ) {
          alert(`person with name: ${deletePerson.name} has been deleted`);
        }
        // Filter the existing persons array to exclude the person with the specified id
        const updatedPersons = persons.filter((p) => p.id !== id);

        // Re-assign IDs to the remaining persons
        updatedPersons.forEach((person, index) => {
          person.id = index + 1;
        });

        // Set the state of persons to the updated array
        setPersons(updatedPersons);
      });
    } catch (error) {
      alert(`the person '${person.name}' was already deleted from server`);
      setPersons(persons.filter((n) => n.id !== id));
    }
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
      <div>
        <ul>
          {persons.map((person) => (
            <NumbersList
              key={person.id}
              person={person}
              handleDelete={() => handleDeleteOf(person.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhoneBook;
