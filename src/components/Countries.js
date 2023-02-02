import React, { useEffect, useState } from "react";
import countriesServices from "../services/countries";
import Countrie from "./Countrie";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [visibility, setVisibility] = useState({});
  // const [toggleButton, setToggleButton] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

  const handleSearchNameChange = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  };

  const filteredArray = countries.filter((countrie) =>
    countrie.name.common.includes(searchName)
  );

  useEffect(() => {
    console.log("effect");
    if (searchName) {
      countriesServices.getAll().then((response) => {
        setCountries(response.data);
      });
    }
  }, [searchName]);

  console.log("render", countries.length, "notes");
  let displayText = false;

  const toggleShowAndHiddenOf = (name) => {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });

    const countrie = filteredArray.find((c) => c.name.common === name);
    console.log(countrie);

    // setToggleButton(!toggleButton);

    // const changeCountry = { ...countrie, landlocked: !countrie.landlocked };

    // countriesServices
    //   .update(name, changeCountry)
    //   .then((response) => {
    //     setCountries(
    //       filteredArray.map((c) => (c.name.common !== name ? c : response.data))
    //     );
    //   })
    //   .catch((error) => {
    //     setErrorMessage(
    //       `Note '${countrie.name.common}' was already removed from server`
    //     );
    //     setCountries(filteredArray.filter((c) => c.name.common !== name));
    //   });
  };

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
            let languages = countrie.languages;
            let arrFromLanguges = Object.entries(languages);
            return (
              <Countrie
                key={i}
                countrie={countrie}
                toggleShowAndHidden={() =>
                  toggleShowAndHiddenOf(countrie.name.common)
                }
                label={visibility[countrie.name.common]}
                i={i}
                arrFromLanguges={arrFromLanguges}
              />
            );
          } else if (filteredArray.length === 1) {
            console.log("one country");
            let languages = countrie.languages;
            let arrFromLanguges = Object.entries(languages);

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
