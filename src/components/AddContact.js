import React from "react";

const AddContact = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name:{" "}
          <input
            onChange={props.handleNameChange}
            value={props.newName}
            placeholder="write a name..."
          />
        </div>
        <div>
          number:{" "}
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
            placeholder="write a number..."
          />
        </div>
        <div>
          <button type="submit" id="addContactButton">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
