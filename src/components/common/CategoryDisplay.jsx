import React, { useState } from "react";
import "../../styles/categoryDisplay.css";

const CategoryDisplay = ({
  categories,
  handleCreate,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div className="category-display">
      <h2>Categories</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleUpdate(category)}>Update</button>
                <button onClick={() => handleDelete(category)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Create New Category</button>
    </div>
  );
};

export default CategoryDisplay;
