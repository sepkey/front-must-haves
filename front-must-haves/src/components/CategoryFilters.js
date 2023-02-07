import React from "react";

function CategoryFilters({ setCurrentCategory, CATEGORIES }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={() => setCurrentCategory("all")}
            className="btn btn-all-categories"
          >
            all
          </button>
        </li>
        {CATEGORIES.map((item) => (
          <li className="category" key={item.name}>
            <button
              onClick={() => setCurrentCategory(item.name)}
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

export default CategoryFilters;
