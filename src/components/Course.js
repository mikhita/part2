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
    </div>
  );
};

export default Course;
