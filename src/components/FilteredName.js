import React from "react";

const FilteredName = (props) => {
  return (
    <div className="flex flex-col items-center p-4">
  <div className="flex flex-col items-center mb-4">
    <label className="font-bold text-lg text-gray-700">Filter with name</label>
    <input
      className="p-2 border border-gray-400 rounded"
      onChange={props.handleSearchNameChange}
      value={props.searchName}
    />
  </div>
  <ul className="list-reset">
    {props.filteredArray.length === 0 ? (
      <p className="text-gray-600">no results found</p>
    ) : (
      props.filteredArray.map((name) => {
        return (
          <li key={name.id} className="text-gray-800 hover:bg-gray-200 py-2 px-4">
            {name.name}
          </li>
        );
      })
    )}
  </ul>
</div>

  );
};

export default FilteredName;
