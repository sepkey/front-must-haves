import React, { useState } from "react";
import supabase from "../soupabase";

function LessonForm({ setLessons, setShowForm, CATEGORIES }) {
  const initialInputs = {
    text: "",
    source: "",
    category: "",
  };
  const [inputObj, setInputObj] = useState(initialInputs);
  const [isUploading, setIsUploading] = useState(false);
  const { text, source, category } = inputObj;

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const handleChange = (e) => {
    setInputObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      setIsUploading(true);
      const { data: newLesson, error } = await supabase
        .from("lesson-pieces")
        .insert([{ text, source, category }])
        .select();

      setIsUploading(false);
      !error && setLessons((prev) => [newLesson[0], ...prev]);
      setInputObj(initialInputs);
      setShowForm(false);
    }
  };

  return (
    <form className="lesson-form" onSubmit={handleSubmit}>
      <input
        name="text"
        value={inputObj.text}
        onChange={handleChange}
        type="text"
        placeholder="Share the point you've learned sofar..."
      />
      <span>{200 - inputObj.text.length}</span>
      <input
        name="source"
        value={inputObj.source}
        onChange={handleChange}
        type="text"
        placeholder="Trustworthy source..."
      />
      <select name="category" value={inputObj.category} onChange={handleChange}>
        <option value="">choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button disabled={isUploading} type="submit" className="btn btn-lg">
        Post
      </button>
    </form>
  );
}

export default LessonForm;
