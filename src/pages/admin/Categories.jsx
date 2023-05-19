import React, { useEffect, useState } from "react";
import CategoryDisplay from "../../components/common/CategoryDisplay";
import "../../styles/categoryDisplay.css";
import categoryApi from "../../api/categoryApi";
import { toast } from "react-toastify";

function Categories() {
  const [categories, setCategories] = useState([
    { _id: 1, name: "Clothing" },
    { _id: 2, name: "Electronics" },
    { _id: 3, name: "Home goods" },
  ]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await categoryApi.getCategories();
      setCategories(res);
    };
    getCategories();
  }, []);

  const [newCategory, setNewCategory] = useState("");

  const handleCreate = async () => {
    const res = await categoryApi.createCategory(newCategory);
    if (res && res.msg) {
      toast.success(res.msg);
    }
    setNewCategory("");
    setCategories([
      ...categories,
      { id: categories.length + 1, name: newCategory },
    ]);
    setNewCategory("");
  };

  const handleUpdate = async (id, updatedName) => {
    const res = categoryApi.updateCategoryById(id, updatedName);
    if (res && res.msg) {
      toast.success(res.msg);
    }
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name: updatedName } : category
      )
    );
  };

  const handleDelete = async (deletedCategory) => {
    const res = await categoryApi.deleteCategoryById(deletedCategory._id);
    if (res && res.msg) {
      toast.success(res.msg);
      console.log(res);
    }

    const newCategories = categories.filter(
      (category) => category._id !== deletedCategory._id
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
          {categories?.map((category, idx) => (
            <tr key={category._id}>
              <td>{idx + 1}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleUpdate(category._id, "updated")}>
                  Update
                </button>
                <button onClick={() => handleDelete(category)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{
          marginTop: "20px",
        }}
        onClick={handleCreate}
      >
        Create New Category
      </button>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
    </div>
  );
}

export default Categories;
