import "./style.css";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GiSurprisedSkull } from "react-icons/gi";
import { useState } from "react";

const initialData = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "reactjs",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "nextjs",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "typescript",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];
const CATEGORIES = [
  { name: "reactjs", color: "#61dafc" },
  { name: "redux", color: "#7749bd" },
  { name: "react-query", color: "#ff4154" },
  { name: "nextjs", color: "#000" },
  { name: "typescript", color: "#3178c6" },
  { name: "javascript", color: "#f7e018" },
  { name: "graphql", color: "#e632ad" },
  { name: "nodejs", color: "#68a063" },
];
function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header setShowForm={setOpen} showForm={open} />
      {open && <LessonForm />}
      <main className="main">
        <CategoryFilters />
        <LessonsList />
      </main>
    </>
  );
}

function LessonForm() {
  const [inputObj, setInputObj] = useState({
    text: "",
    source: "",
    category: "",
  });
  const handleChange = (e) => {
    setInputObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <button type="submit" className="btn btn-lg">
        Post
      </button>
    </form>
  );
}

function CategoryFilters() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">all</button>
        </li>
        {CATEGORIES.map((item) => (
          <li className="category" key={item.name}>
            <button
              style={{ borderColor: item.color }}
              className="btn btn-category"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function LessonsList() {
  const lessons = initialData;
  return (
    <section>
      <ul className="lesson-list">
        {lessons.map((lesson) => {
          return <Lesson key={lesson.id} item={lesson} />;
        })}
      </ul>
      <p>There are {lessons.length} lessons in the database.</p>
    </section>
  );
}

function Header({ setShowForm, showForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="learning" />
        <h1>Front Must-Haves</h1>
      </div>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="btn btn-lg btn-toggle"
      >
        {showForm ? "close" : "Share knolwledge"}
      </button>
    </header>
  );
}

function Lesson({ item }) {
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
          border: `1px dashed ${
            CATEGORIES.find((i) => i.name === item.category).color
          }`,
        }}
      >
        {item.category}
      </span>
      <div className="vote-buttons">
        <button>
          <AiFillLike /> {item.votesInteresting}
        </button>
        <button>
          <GiSurprisedSkull /> {item.votesMindblowing}
        </button>
        <button>
          <AiFillDislike /> {item.votesFalse}
        </button>
      </div>
    </li>
  );
}
export default App;
