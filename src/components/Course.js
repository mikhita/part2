import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course[0].name}</h1>
      <ul>
        {course[0].parts.map((item) => {
          return (
            <li key={course[0].parts.id}>
              {item.name}
              {"  "} {item.exercises}
            </li>
          );
        })}
      </ul>
      <p>
        Total of{" "}
        <span>
          {" "}
          {course[0].parts.reduce((sum, parts) => {
            return sum + parts.exercises;
          }, 0)}{" "}
        </span>{" "}
        exercises
      </p>
      <h1>{course[1].name}</h1>
      <ul>
        {course[1].parts.map((item) => {
          return (
            <li key={course[1].parts.id}>
              {item.name}
              {"  "} {item.exercises}
            </li>
          );
        })}
      </ul>
      <p>
        Total of{" "}
        <span>
          {" "}
          {course[1].parts.reduce((sum, parts) => {
            return sum + parts.exercises;
          }, 0)}{" "}
        </span>{" "}
        exercises
      </p>
    </div>
  );
};

export default Course;
