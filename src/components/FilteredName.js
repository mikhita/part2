import React from "react";

const FilteredName = (props) => {
  return (
    <div>
      <div>
        filter shown with{" "}
        <input
          onChange={props.handleSearchNameChange}
          value={props.searchName}
        />
      </div>
      <ul>
        {props.filteredArray.length === 0 ? (
          <p>no results found</p>
        ) : (
          props.filteredArray.map((name) => {
            console.log(name.id);
            return <li key={name.id}>{name.name}</li>;
          })
        )}
      </ul>
    </div>
  );
};

export default FilteredName;
