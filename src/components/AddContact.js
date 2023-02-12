import React from "react";

const AddContact = (props) => {
  return (
    <div className="p-4">
  <form onSubmit={props.addName}>
    <div className="mb-4">
      <label className="font-bold text-lg text-gray-700 ">name:</label>
      <input
        className="p-2 border border-gray-400 rounded mb-2 ml-7"
        onChange={props.handleNameChange}
        value={props.newName}
        placeholder="write a name..."
      />
    </div>
    <div className="mb-4">
      <label className="font-bold text-lg text-gray-700">number:</label>
      <input
        className="p-2 border border-gray-400 rounded mb-2 ml-2"
        value={props.newNumber}
        onChange={props.handleNumberChange}
        placeholder="write a number..."
      />
    </div>
    <div>
      <button
        type="submit"
        id="addContactButton"
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-900"
      >
        add
      </button>
    </div>
  </form>
</div>

  );
};

export default AddContact;
