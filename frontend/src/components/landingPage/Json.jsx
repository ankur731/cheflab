import React, { useEffect, useState, useRef } from "react";
import "./Json.css";
import { TagsInput } from "react-tag-input-component";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import Lottie from "lottie-react";
import loading from "../../assets/lottie/loading.json"

import { Chart } from "react-google-charts";


export const options = {
  title: "My Daily Activities",
  is3D: true,
};



function Json() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [num, setNum] = useState(0);
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [calorieRequirement, setCalorieRequirement] = useState(0);
  // const [selected, setSelected] = useState(["papaya"]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartCal, setChartCal] = useState(0);
  const [card, setCard] = useState(false);
  const [dataset, setDataset] = useState([["Task", "Hours per Day"]]);
  
   const dataset2 = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  const chartClicked = (data) => {
    // dataset.push(["calorie"], 55)
    const temp =  [ ["Task", "Hours per Day"],["Calories", data.Calories], ["Fat", data.SaturatedFatContent], ["Sodium", data.SodiumContent]];
    console.log(temp);
    setDataset( temp)
    console.log(dataset)
    setCard(!card);
    
    // setChartCal(temp);
    // console.log(chartCal);
  }

    const calculateBMR = () => {
    let bmr;

    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }

    return bmr;
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const bmr = calculateBMR();
    const requirement = bmr * activityLevel;
    console.log(requirement)
    setCalorieRequirement(requirement);
    console.log(calorieRequirement)

    const calPerMeal = requirement / num;

    const inputData = {
      calorie: calPerMeal,
      ingredients: ingredients,
    };

    
    try {
      const response = await fetch("http://localhost:8000/submit-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful response
      const data = await response.json();
      setIsLoading(false)
      const data2 = JSON.parse(data);
      setRecommendations(data2);
      console.log(data2);
      // console.log(response)
    } catch (error) {
      console.error("Error:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container json-container">
      <div className="box">
        <h1>Food recommendation syste</h1>
        <h2>Enter Required calorie</h2>
        <form onSubmit={handleSubmit} className="box">
          <label htmlFor="weight">Enter Weight</label>
          <input
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            // placeholder="250"
          />
          <br />
          <label htmlFor="recommendation">Enter Height</label>
          <input
            id="recommendation"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            // placeholder="5"
          />
          <br />
          <label htmlFor="recommendation">Enter Age</label>
          <input
            id="recommendation"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            // placeholder="5"
          />
          <br />
          <label htmlFor="recommendation">Enter Number of meals per day</label>
          <input
            id="recommendation"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            type="number"
            // placeholder="5"
          />
          <br />
          <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          </label>
          
          <label>
          Activity Level:
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
          >
            <option value={1.2}>Sedentary (Little or no exercise)</option>
            <option value={1.375}>Lightly active (Light exercise or sports 1-3 days a week)</option>
            <option value={1.55}>Moderately active (Moderate exercise or sports 3-5 days a week)</option>
            <option value={1.725}>Very active (Hard exercise or sports 6-7 days a week)</option>
            <option value={1.9}>Super active (Very hard exercise or sports, physical job, or training)</option>
          </select>
        </label>
          <label htmlFor="ingredients">Enter Any Ingredients</label>
          <TagsInput
            value={ingredients}
            onChange={setIngredients}
            // name="fruits"
            placeHolder="Enter Ingredients"
          />

          <button type="submit"  className="btn">
            Generate Recommendation
          </button>
        </form>
        {isLoading &&
          <Lottie animationData={loading} />
          }
        {/* {recommendations.map((recipe) => {
          return (
            <li key={recipe.RecipeId}>
              {recipe.Name} - calorie: {recipe.Calories}
              {recipe.IngredientText}
            </li>
          );
        })} */}
        {/* <TableauEmbed width={'90vw'} height={'90vh'} sourceUrl="https://public.tableau.com/views/starebucks/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link" /> */}
      
        <div className="recommendation container">
          <div className="row">
            <div className="col-lg-4 rec-col">
              {recommendations.map((recipe) => {
                return ( <div key={recipe.RecipeId} className="rec-card" onClick={()=>chartClicked(recipe)}>
                <div className="rec-img">
                {recipe.Name} 
                </div>
                <div className="rec-content">
                {recipe.Calories} 
                  </div>
                  {card &&
                    <Chart
      chartType="PieChart"
      data={dataset}
      options={options}
      width={"100%"}
      height={"200px"}
                    />
                  }
              </div>
          
          
          );
        })}
            </div>
            <div className="col-lg-4 rec-col">
              {recommendations.map((recipe) => {
                return ( <div key={recipe.RecipeId} className="rec-card">
                <div className="rec-img">
                {recipe.Name} 
                </div>
                <div className="rec-content">
                    {recipe.Calories} 
                    {card &&
                      <p>{recipe.IngredientText}</p>
                    }
                  </div>
                  
              </div>
          
          
          );
        })}
            </div>
            <div className="col-lg-4 rec-col">
              {recommendations.map((recipe) => {
                return ( <div key={recipe.RecipeId} className="rec-card">
                <div className="rec-img">
                <img className="recimg" src={recipe.Images} alt="cardimg"/>
                </div>
                <div className="rec-content">
                    <h5>{recipe.Name} </h5>
                    <h5>{recipe.Calories} </h5>
                    
                </div>
              </div>
          
          
          );
        })}
            </div>
              </div>
        </div>
        {/* <Pie data={dataset}/> */}
       
      </div>
    </div>
  );
}

export default Json;
