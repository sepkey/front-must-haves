import React from "react";
import Lesson from "./Lesson";

function LessonsList({ lessons, setLessons, CATEGORIES }) {
  if (lessons.length === 0) {
    return (
      <p className="message">
        No lessons yet! Write your first lesson you learned
      </p>
    );
  }
  return (
    <section>
      <ul className="lesson-list">
        {lessons.map((lesson) => {
          return (
            <Lesson
              CATEGORIES={CATEGORIES}
              key={lesson.id}
              item={lesson}
              setLessons={setLessons}
            />
          );
        })}
      </ul>
      <p>There are {lessons.length} lessons in the database.</p>
    </section>
  );
}

export default LessonsList;
