import React, { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GiSurprisedSkull } from "react-icons/gi";
import supabase from "../soupabase";

function Lesson({ item, setLessons, CATEGORIES }) {
  const [isUpdating, setIsUpdating] = useState(false);
  async function handleVote(str) {
    setIsUpdating(true);
    const { data, error } = await supabase
      .from("lesson-pieces")
      .update([{ [str]: item[str] + 1 }])
      .eq("id", item.id)
      .select();
    setIsUpdating(false);
    !error &&
      setLessons((lessons) =>
        lessons.map((l) => (l.id === item.id ? data[0] : l))
      );
  }
  return (
    <li className="lesson">
      <p>
        {item.text}
        <a
          className="source"
          href={item.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          borderColor: `${
            CATEGORIES.find((i) => i.name === item.category).color
          }`,
        }}
      >
        {item.category}
      </span>
      <div className="vote-buttons">
        <button disabled={isUpdating} onClick={() => handleVote("votesLike")}>
          <AiFillLike /> {item.votesLike}
        </button>
        <button disabled={isUpdating} onClick={() => handleVote("votesGreat")}>
          <GiSurprisedSkull /> {item.votesGreat}
        </button>
        <button
          disabled={isUpdating}
          onClick={() => handleVote("votesDislike")}
        >
          <AiFillDislike /> {item.votesDislike}
        </button>
      </div>
    </li>
  );
}

export default Lesson;
