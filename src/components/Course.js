import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {console.log(course.parts)}
        {course.parts.map((item) => {
          return (
            <li key={course.parts.id}>
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
          {course.parts.reduce((sum, parts) => {
            return sum + parts.exercises;
          }, 0)}{" "}
        </span>{" "}
        exercises
      </p>
    </div>
  );
};

export default Course;
