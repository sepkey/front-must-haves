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

//select elements
const btn = document.querySelector(".btn-toggle");
const form = document.querySelector(".lesson-form");
const lessonsList = document.querySelector(".lesson-list");

lessonsList.innerHTML = "";
loadLessons();
async function loadLessons() {
  const res = await fetch(
    "https://bltuutomneoflzauidrg.supabase.co/rest/v1/lesson-pieces",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdHV1dG9tbmVvZmx6YXVpZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1MTAwMjYsImV4cCI6MTk5MTA4NjAyNn0.vsrkwjdsNvsotmlI775ukB0QzD1EFu6NM0yIF2US6RE",
      },
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdHV1dG9tbmVvZmx6YXVpZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1MTAwMjYsImV4cCI6MTk5MTA4NjAyNn0.vsrkwjdsNvsotmlI775ukB0QzD1EFu6NM0yIF2US6RE",
    }
  );
  const data = await res.json();
  createLessonsList(data);
}

function createLessonsList(data) {
  const htmlArr = data.map((lesson) => {
    return `<li class="lesson">
    <p>
    ${lesson.text}    
    <a class="source" href="${lesson.source}"       
      target="_blank">(Source)</a>
    </p>
    <span class="tag" style="border: 1px dashed ${
      CATEGORIES.find((item) => item.name === lesson.category).color
    }">${lesson.category}</span>
    </li>`;
  });
  const html = htmlArr.join("");
  lessonsList.insertAdjacentHTML("afterbegin", html);
}

// createLessonsList(initialData);
//Toggle btn
btn.addEventListener("click", () => {
  form.classList.toggle("hidden");
  btn.textContent = form.classList.contains("hidden")
    ? "share knowledge"
    : "close";
});
