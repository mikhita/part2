import React from "react";

const Countrie = (props) => {
  return (
    <div>
      <li>
        {props.countrie.name.common}{" "}
        <button onClick={props.toggleShowAndHidden}>
          {props.label ? "Hide" : "Show"}
        </button>
      </li>
      <div>
        {props.label && (
          <div key={props.i}>
            <h1>{props.countrie.name.common}</h1>
            <p>
              {"capital "}
              {props.countrie.capital}
            </p>
            <p>
              {"area "}
              {props.countrie.area}
            </p>
            <h2>Languages:</h2>
            {props.arrFromLanguges.map((lan, i) => {
              return <li key={i}>{lan[1]}</li>;
            })}
            <img
              src={props.countrie.flags.png}
              alt="flag"
              style={{ marginTop: "30px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Countrie;
