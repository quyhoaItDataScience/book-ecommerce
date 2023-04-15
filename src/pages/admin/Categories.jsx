import React, { useState } from "react";
import CategoryDisplay from "../../components/common/CategoryDisplay";
import "../../styles/categoryDisplay.css";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Clothing" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Home goods" },
  ]);

  const [newCategory, setNewCategory] = useState("");

  const handleCreate = () => {
    setCategories([
      ...categories,
      { id: categories.length + 1, name: newCategory },
    ]);
    setNewCategory("");
  };

  const handleUpdate = (id, updatedName) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name: updatedName } : category
      )
    );
  };

  const handleDelete = (deletedCategory) => {
    const newCategories = categories.filter(
      (category) => category.id !== deletedCategory.id
    );
    setCategories(newCategories);
  };

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
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
    </div>
  );
}

export default Categories;
