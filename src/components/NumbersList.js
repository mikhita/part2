import React from "react";

const NumbersList = (props) => {
  return (
    <div>
      <ul>
        {props.persons.map((person) => (
          <li key={person.id}>
            {person.name}
            {": "} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumbersList;
