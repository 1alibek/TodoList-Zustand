import React from "react";
import { useTodoStore } from "../store/todoStore";

const SearchBar: React.FC = () => {
  const setSearchQuery = useTodoStore((state) => state.setSearchQuery);

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search todos..."
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          margin: "0 auto",
          width: "100%",
          
          maxWidth: "400px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#2196F3")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
      />
    </div>
  );
};

export default SearchBar;
