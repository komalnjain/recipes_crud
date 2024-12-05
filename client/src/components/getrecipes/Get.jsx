import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./get.css"; // Import your CSS file

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setRecipes(response.data); // Assuming API returns a list of recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast.error("Failed to fetch recipes. Please try again later.", { position: "top-right" });
      }
    };

    fetchData();
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${recipeId}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete recipe.", { position: "top-right" });
    }
  };

  return (
    <div className="get-container">
      <Link to="/add" className="get-addButton">Add Recipe</Link>
      <table className="get-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Dish Name</th>
            <th>Cuisine</th>
            <th>Ingredients</th>
            <th>Cooking Time</th>
            <th>Serving Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={recipe._id}>
              <td>{index + 1}</td>
              <td>{recipe.dish_name}</td>
              <td>{recipe.cuisine}</td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.cooking_time} mins</td>
              <td>{recipe.serving_size}</td>
              <td className="get-actionButtons">
                <button className="get-deleteButton" onClick={() => deleteRecipe(recipe._id)}>
                  <i className="fa-solid fa-trash">Delete</i>
                </button>
                <Link to={`/edit/${recipe._id}`} className="get-editButton">
                  <i className="fa-solid fa-pen-to-square">Edit</i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
