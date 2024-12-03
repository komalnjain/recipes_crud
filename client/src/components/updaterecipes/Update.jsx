import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios"; // Adjust the path if needed
import toast from 'react-hot-toast';
import "bootstrap/dist/css/bootstrap.min.css";
import "./update.css"; // Import your CSS file

const Edit = () => {
  const initialRecipeState = {
    dish_name: "",
    cuisine: "",
    ingredients: "",
    cooking_time: "",
    serving_size: ""
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(initialRecipeState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    console.log(recipe);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`) // Fetch the specific recipe
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log("Error fetching recipe:", error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, recipe) // Update the recipe
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/"); // Navigate back to the recipe list
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
        toast.error("Failed to update the recipe.", { position: "top-right" });
      });
  };

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update Recipe</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="dish_name">Dish Name</label>
          <input
            type="text"
            value={recipe.dish_name}
            onChange={inputChangeHandler}
            id="dish_name"
            name="dish_name"
            autoComplete='off'
            placeholder='Dish Name'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            value={recipe.cuisine}
            onChange={inputChangeHandler}
            id="cuisine"
            name="cuisine"
            autoComplete='off'
            placeholder='Cuisine'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            value={recipe.ingredients}
            onChange={inputChangeHandler}
            id="ingredients"
            name="ingredients"
            autoComplete='off'
            placeholder='Ingredients'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="cooking_time">Cooking Time</label>
          <input
            type="number"
            value={recipe.cooking_time}
            onChange={inputChangeHandler}
            id="cooking_time"
            name="cooking_time"
            autoComplete='off'
            placeholder='Cooking Time (in mins)'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="serving_size">Serving Size</label>
          <input
            type="number"
            value={recipe.serving_size}
            onChange={inputChangeHandler}
            id="serving_size"
            name="serving_size"
            autoComplete='off'
            placeholder='Serving Size'
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Update Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
