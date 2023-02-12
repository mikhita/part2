import React from "react";

const NumbersList = (props) => {
  return (
    <li className="py-2 w-96 ">
  <span className="font-bold text-lg text-gray-700" >{props.person.name}</span>
  <span className="text-gray-700">{" : "} {props.person.number}</span>
  <button
    className="ml-7 bg-red-600 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
    onClick={props.handleDelete}
  >
    delete
  </button>
</li>

  

  );
};

export default NumbersList;
