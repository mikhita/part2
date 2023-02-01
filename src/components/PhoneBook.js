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
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageRed, setErrorMessageRed] = useState(null);

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
      if (JSON.stringify(array[i].name) === JSON.stringify(newObject.name)) {
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
      alert(
        `${newName}  is already added to phonebook, replace the old number with a new one? `
      );
      const person = persons.find((p) => p.name === personObject.name);
      let id = 0;
      if (person) {
        id = person.id;
      }
      console.log("person with id is", person);
      const changePerson = { ...person, number: personObject.number };

      personsServices
        .update(id, changePerson)
        .then((response) => {
          console.log(response);
          setPersons(persons.map((p) => (p.id !== id ? p : response.data)));
        })
        .catch((error) => {
          alert(`the note '${person.name}' was already deleted from server`);
          setErrorMessageRed(`${person.name} has been removed from server`);
          setTimeout(() => {
            setErrorMessageRed(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    } else if (personObject.name.length < 2 || personObject.number.length < 2) {
      alert(`input is requiered`);
    } else {
      personsServices.create(personObject).then((response) => {
        if (personObject.name.length > 2) {
          setPersons(persons.concat(personObject));
          setErrorMessage(`${personObject.name} was added to the phonebook`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
  const Notification = ({ message }) => {
    const errorMessageStyle = {
      color: "green",
      fontStyle: "bold",
      fontSize: 26,
      padding: 10,
      backgroundColor: "#D3D3D3",
      border: "2px solid green",
      width: "70%",
    };
    if (message === null) {
      return null;
    }

    return (
      <div className="error" style={errorMessageStyle}>
        {message}
      </div>
    );
  };
  const Notification2 = ({ message }) => {
    const errorMessageStyle = {
      color: "red",
      fontStyle: "bold",
      fontSize: 26,
      padding: 10,
      backgroundColor: "#D3D3D3",
      border: "2px solid red",
      width: "70%",
    };
    if (message === null) {
      return null;
    }

    return (
      <div className="error" style={errorMessageStyle}>
        {message}
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Notification2 message={errorMessageRed} />
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
