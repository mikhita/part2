import PhoneBook from "./components/PhoneBook";

import axios from "axios";

const promise = axios.get("http://localhost:3001/persons");
promise.then((response) => {
  const persons = response.data;
  console.log(persons);
});

// const promise2 = axios.get("http://localhost:3001/foobar");
// promise2.then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });

const App = () => {
  // const courses = [
  // {
  //   name: "Half Stack application development",
  //   id: 1,
  //   parts: [
  //     {
  //       name: "Fundamentals of React",
  //       exercises: 10,
  //       id: 1,
  //     },
  //     {
  //       name: "Using props to pass data",
  //       exercises: 7,
  //       id: 2,
  //     },
  //     {
  //       name: "State of a component",
  //       exercises: 14,
  //       id: 3,
  //     },
  //     {
  //       name: "Redux",
  //       exercises: 11,
  //       id: 4,
  //     },
  //   ],
  // },
  // {
  //   name: "Node.js",
  //   id: 2,
  //   parts: [
  //     {
  //       name: "Routing",
  //       exercises: 3,
  //       id: 1,
  //     },
  //     {
  //       name: "Middlewares",
  //       exercises: 7,
  //       id: 2,
  //     },
  //   ],
  // },
  // ];

  // const notes = [
  //   {
  //     id: 1,
  //     content: "HTML is easy",
  //     important: true,
  //   },
  //   {
  //     id: 2,
  //     content: "Browser can execute only JavaScript",
  //     important: false,
  //   },
  //   {
  //     id: 3,
  //     content: "GET and POST are the most important methods of HTTP protocol",
  //     important: true,
  //   },
  // ];

  return <PhoneBook />;
};

export default App;
