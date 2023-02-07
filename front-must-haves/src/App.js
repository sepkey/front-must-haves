import "./style.css";
import { useState, useEffect } from "react";
import supabase from "./soupabase";
import LessonForm from "./components/LessonForm";
import CategoryFilters from "./components/CategoryFilters";
import Header from "./components/Header";
import Loader from "./components/Loader";
import LessonsList from "./components/LessonsList";

const CATEGORIES = [
  { name: "reactjs", color: "#61dafc" },
  { name: "redux", color: "#7749bd" },
  { name: "react-query", color: "#ff4154" },
  { name: "nextjs", color: "#71717a" },
  { name: "typescript", color: "#3178c6" },
  { name: "javascript", color: "#f7e018" },
  { name: "graphql", color: "#e632ad" },
  { name: "nodejs", color: "#68a063" },
];

function App() {
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    async function getLessons() {
      setIsLoading(true);
      let query = supabase.from("lesson-pieces").select("*");

      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }

      let { data, error } = await query
        .order("votesLike", { ascending: false })
        .limit(1000);

      if (!error) {
        setLessons(data);
      } else {
        alert("There seems to be a mistake");
      }
      setIsLoading(false);
    }
    getLessons();
  }, [currentCategory]);

  return (
    <>
      <Header setShowForm={setOpen} showForm={open} />
      {open && (
        <LessonForm
          CATEGORIES={CATEGORIES}
          setLessons={setLessons}
          setShowForm={setOpen}
        />
      )}
      <main className="main">
        <CategoryFilters
          CATEGORIES={CATEGORIES}
          setCurrentCategory={setCurrentCategory}
        />
        {isloading ? (
          <Loader />
        ) : (
          <LessonsList
            CATEGORIES={CATEGORIES}
            setLessons={setLessons}
            lessons={lessons}
          />
        )}
      </main>
    </>
  );
}

export default App;
