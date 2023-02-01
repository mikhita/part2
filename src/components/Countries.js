import React, { useEffect, useState } from "react";
import countriesServices from "../services/countries";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleSearchNameChange = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  };

  const filteredArray = countries.filter((countrie) =>
    countrie.name.common.includes(searchName)
  );

  useEffect(() => {
    console.log("effect");
    countriesServices.getAll().then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "notes");
  let displayText = false;

  return (
    <div>
      <form>
        <div>
          find countries:{" "}
          <input value={searchName} onChange={handleSearchNameChange} />
        </div>
      </form>
      <ul>
        {filteredArray.map((countrie, i) => {
          if (filteredArray.length > 10 && !displayText) {
            displayText = true;
            return <p key={i}>Too many matches, specify another filter</p>;
          } else if ((filteredArray.length < 11) & (filteredArray.length > 1)) {
            return <li key={i}>{countrie.name.common}</li>;
          } else if (filteredArray.length === 1) {
            console.log("one country");
            let languages = countrie.languages;
            let arrFromLanguges = Object.entries(languages);
            console.log("languages", arrFromLanguges);
            return (
              <div key={i}>
                <h1>{countrie.name.common}</h1>
                <p>
                  {"capital "}
                  {countrie.capital}
                </p>
                <p>
                  {"area "}
                  {countrie.area}
                </p>
                <h2>Languages:</h2>
                {arrFromLanguges.map((lan, i) => {
                  return <li key={i}>{lan[1]}</li>;
                })}
                <img
                  src={countrie.flags.png}
                  alt="flag"
                  style={{ marginTop: "30px" }}
                />
              </div>
            );
          }
          return false;
        })}
      </ul>
    </div>
  );
};

export default Countries;
