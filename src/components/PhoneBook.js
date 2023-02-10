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

  console.log("render", persons.length, "persons", persons);

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
  console.log("persons are", persons);

  const filteredArray = persons.filter((person) =>
    person.name.includes(searchName)
  );
  console.log("filteredaRRAY:", filteredArray);
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
    };

    if (!canAddObject(persons, personObject)) {
      alert(
        `${newName}  is already added to phonebook, replace the old number with a new one? `
      );
      const person = persons.find((p) => p.name === personObject.name);
      let id = person.id;

      console.log("person with id is", person);
      const changePerson = { ...person, number: personObject.number };
      console.log("changePerson with id is", changePerson, id);

      personsServices
        .update(id, changePerson)
        .then((response) => {
          console.log("response is", response.data);
          setPersons(persons.map((p) => (p.id !== id ? p : response.data)));
        })
        .catch((error) => {
          setErrorMessageRed(
            "min charecters should be 8 and if formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers"
          );

          // alert(`the note '${person.name}' was already deleted from server`);
          // setErrorMessageRed(`${person.name} has been removed from server`);
          setTimeout(() => {
            setErrorMessageRed(null);
          }, 5000);
          // setPersons(persons.filter((p) => p.id !== id));
        });
    } else if (personObject.name.length < 2 || personObject.number.length < 2) {
      alert(`input is requiered`);
    } else {
      personsServices
        .create(personObject)
        .then((response) => {
          if (personObject.name.length <= 2) {
            setErrorMessageRed("Name should be at least 3 characters long");
            setTimeout(() => {
              setErrorMessageRed(null);
            }, 5000);
          } else if (
            !/^\d{2,3}-\d{6,}$/.test(personObject.number) &&
            personObject.number.length < 8
          ) {
            setErrorMessageRed(
              "min charecters should be 8 and if formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers"
            );
            setTimeout(() => {
              setErrorMessageRed(null);
            }, 5000);
          } else {
            setPersons(persons.concat(response.data));
            setErrorMessage(`${personObject.name} was added to the phonebook`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          }
        })
        .catch((error) => {
          console.log(error.response.data.error);
          if (
            error.response.data.error.includes(
              "Person validation failed: number"
            )
          ) {
            setErrorMessageRed(
              "min charecters should be 8 and if formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers"
            );
          } else {
            setErrorMessageRed(error.response.data.error);
          }
          setTimeout(() => {
            setErrorMessageRed(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeleteOf = (id) => {
    const person = persons.find((p) => p.id === id);
    try {
      const deletePerson = { ...person };
      console.log("I am in try", deletePerson);
      if (
        window.confirm(`Do you really want to delete ${deletePerson.name} ?`)
      ) {
        personsServices.delet(id, deletePerson).then((response) => {
          if (response.status === 204) {
            alert(`person with name: ${deletePerson.name} has been deleted`);
            setPersons(persons.filter((n) => n.id !== id));
          } else {
            throw new Error(`Failed to delete person with id ${id}`);
          }
        });
      }
    } catch (error) {
      alert(`the person '${person.name}' was already deleted from server`);
      setPersons(persons.filter((n) => n.id !== id));
      console.log("I am in catch");
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
