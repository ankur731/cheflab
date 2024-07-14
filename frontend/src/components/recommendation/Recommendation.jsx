import React, { useEffect, useState, useRef } from "react";
import "../landingPage/Json.css";
import { TagsInput } from "react-tag-input-component";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import Lottie from "lottie-react";
// import loading from "../../assets/lottie/loading.json"
import loading from "../../assets/lottie/loading.json";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom'


import { Chart } from "react-google-charts";

export const options = {
  title: "Nutrition Amount In Recipe",
  is3D: true,
};

function Recommendation() {

  const navigate = useNavigate();

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [num, setNum] = useState();
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [calorieRequirement, setCalorieRequirement] = useState(0);
  // const [selected, setSelected] = useState(["papaya"]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartCal, setChartCal] = useState(0);
  const [card, setCard] = useState(0);
  const [dataset, setDataset] = useState([["Task", "Hours per Day"]]);
  const [column, setColumn] = useState(0);
  const [selcal, setSelCal] = useState(0);

  // const dataset2 = [
  //   ["Task", "nutrition"],
  //   ["Work", 11],
  //   ["Eat", 2],
  //   ["Commute", 2],
  //   ["Watch TV", 2],
  //   ["Sleep", 7],
  // ];

  const sendToViz = () => {
    navigate("/visualization")
  }
  const chartClicked = (data) => {
    // dataset.push(["calorie"], 55)
    const temp = [
      ["Task", "Nutrition Content"],
      // ["Calories", data.Calories],
      ["Fat", data.SaturatedFatContent],
      // ["Sodium", data.SodiumContent],
      ["Carbohydrate", data.CarbohydrateContent],
      ["Cholesterol", data.CholesterolContent],
      ["Fiber", data.FiberContent],
      ["Protein", data.ProteinContent],
      ["Sugar", data.SugarContent],
    ];
    setDataset(temp);
    if (card == data.RecipeId) setCard(0);
    else setCard(data.RecipeId);

    // setChartCal(temp);
    // console.log(chartCal);
  };

  const calculateBMR = () => {
    let bmr;

    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    return bmr;
  };

  const selectbtn = (data) => {
    console.log(selcal);
    setSelCal(selcal + data);
    console.log(selcal);
    // setMeal((oldArray) => [...oldArray, data])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const bmr = calculateBMR();
    const requirement = bmr * activityLevel;
    setCalorieRequirement(requirement);

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
      setIsLoading(false);
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
    <div className="recc">
      <div className="container Food-container">
        <div className="box">
          <h1>FOOD RECOMMENDATION SYSTEM</h1>

          <form onSubmit={handleSubmit} className="box">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="weight" class="form-label">
                    Enter Weight
                  </label>
                  <input
                    class="form-control"
                    id="weight"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    // placeholder="250"
                  />
                </div>
                <div className="col-md-6">
                  <label class="form-label" htmlFor="recommendation">
                    Enter Height
                  </label>
                  <input
                    class="form-control"
                    id="recommendation"
                    value={height}
                    required
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    // placeholder="5"
                  />
                </div>
                <div className="col-md-6">
                  <label class="form-label mt-3" htmlFor="recommendation">
                    Enter Age
                  </label>
                  <input
                    class="form-control"
                    id="recommendation"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    // placeholder="5"
                  />
                </div>
                <div className="col-md-6">
                  <label class="form-label mt-3" htmlFor="recommendation">
                    Enter Number of meals per day
                  </label>
                  <input
                    class="form-control"
                    id="recommendation"
                    value={num}
                    contentEditable={false}
                    onChange={(e) => setNum(3)}
                    type="number"
                    // placeholder="5"
                  />
                </div>
                <div className="col-md-6">
                  <label class="form-label col-md-12 mt-3">
                    Gender:
                    <select
                      value={gender}
                      class="form-control"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>
                </div>

                <div className="col-md-6">
                  <label class="form-label col-md-12 mt-3">
                    Activity Level:
                    <select
                      class="form-control"
                      value={activityLevel}
                      onChange={(e) =>
                        setActivityLevel(parseFloat(e.target.value))
                      }
                    >
                      <option value={1.2}>
                        Sedentary (Little or no exercise)
                      </option>
                      <option value={1.375}>
                        Lightly active (Light exercise or sports 1-3 days a
                        week)
                      </option>
                      <option value={1.55}>
                        Moderately active (Moderate exercise or sports 3-5 days
                        a week)
                      </option>
                      <option value={1.725}>
                        Very active (Hard exercise or sports 6-7 days a week)
                      </option>
                      <option value={1.9}>
                        Super active (Very hard exercise or sports, physical
                        job, or training)
                      </option>
                    </select>
                  </label>
                </div>
                <div className="col-md-12">
                  <label class="form-label mt-3" htmlFor="ingredients">
                    Enter Any Ingredients
                  </label>
                  <TagsInput
                    classNames="taginput"
                    value={ingredients}
                    onChange={setIngredients}
                    // name="fruits"
                    placeHolder="Enter Ingredients"
                  />
                </div>
<div className="btn-row">
                <div className="col-md-8 mt-5 mb-5 d-flex align-items-center justify-content-around">
                  <button type="submit" className="btn">
                    Generate Recommendation
                  </button>
                  <button onClick={sendToViz} className='viz-btn'>Tablaeu Vizualization</button>

                  </div>
                  </div>
              </div>
            </div>
          </form>
          <div className="col-md-4 w-100 d-flex justify-content-center align-items-center">
            {isLoading && <Lottie animationData={loading} />}
          </div>
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
                <div className="meal-time">
                  <h4>Breakfast</h4>
                </div>
                {recommendations.slice(0, 5).map((recipe) => {
                  return (
                    <>
                      <div key={recipe.RecipeId} className="rec-card">
                        <div className="card-main">
                          <div
                            className="rec-img"
                            onClick={() => selectbtn(recipe.Calories)}
                          >
                            <img
                              className="recimg"
                              src={recipe.Images}
                              alt="cardimg"
                            />
                          </div>
                          <div className="rec-content">
                            <h5
                              onClick={() => {
                                chartClicked(recipe);
                                setColumn(1);
                              }}
                            >
                              {recipe.Name.slice(0, 17) + "..."}
                            </h5>
                            <p>
                              <strong>Calories</strong> : {recipe.Calories}
                            </p>
                            <ReactStars
                              count={5}
                              value={recipe.AggregatedRating}
                              // onChange={ratingChanged}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                            />
                            <div className="rec-card-botbar">
                              <button className="select-btn">
                                {recipe.RecipeCategory}
                              </button>

                              <button className="time-btn">
                                <img
                                  className="clock"
                                  src={require("../../assets/images/clock.png")}
                                  alt="clock"
                                />
                                {recipe.PrepTime.replaceAll("PT", "")
                                  .replaceAll("H", "min")
                                  .replaceAll("0S", "--")
                                  .replaceAll("M", "min")}
                              </button>
                            </div>
                          </div>
                        </div>
                        {card == recipe.RecipeId && column == 1 && (
                          <>
                            <div className="rec-extra">
                              <h6>{recipe.Name}</h6>
                              <h6 className="mt-3">Recipe Ingredients</h6>
                              <ul>
                                {recipe.IngredientText.replaceAll("(", " ")
                                  .replaceAll(")", " ")
                                  .replaceAll('"', " ")
                                  .split(", ")
                                  .map((str, index) => (
                                    <li key={index}>{str}</li>
                                  ))}
                              </ul>
                              <h6>Recipe Instruction</h6>
                              <ul>
                                {recipe.RecipeInstructions.replaceAll("c(", " ")
                                  .replaceAll(")", " ")
                                  .replaceAll('"', " ")
                                  .split(", ")
                                  .map((str, index) => (
                                    <li key={index}>{str}</li>
                                  ))}
                              </ul>
                            </div>
                            <Chart
                              chartType="PieChart"
                              data={dataset}
                              options={options}
                              width={"100%"}
                              height={"200px"}
                            />
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="col-lg-4 rec-col">
                <div className="meal-time">
                  <h4>Lunch</h4>
                </div>
                {recommendations.slice(5, 10).map((recipe) => {
                  return (
                    <>
                      <div key={recipe.RecipeId} className="rec-card">
                        <div className="card-main">
                          <div
                            className="rec-img"
                            onClick={() => selectbtn(recipe.Calories)}
                          >
                            <img
                              className="recimg"
                              src={recipe.Images}
                              alt="cardimg"
                            />
                          </div>
                          <div className="rec-content">
                            <h5
                              onClick={() => {
                                chartClicked(recipe);
                                setColumn(2);
                              }}
                            >
                              {recipe.Name.slice(0, 17) + "..."}
                            </h5>
                            <p>
                              <strong>Calories</strong> : {recipe.Calories}
                            </p>
                            <ReactStars
                              count={5}
                              value={recipe.AggregatedRating}
                              // onChange={ratingChanged}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                            />
                            <div className="rec-card-botbar">
                              <button className="select-btn">
                                {recipe.RecipeCategory}
                              </button>
                              <button className="time-btn">
                                <img
                                  className="clock"
                                  src={require("../../assets/images/clock.png")}
                                  alt="clock"
                                />
                                {recipe.PrepTime.replaceAll("PT", "")
                                  .replaceAll("H", "min")
                                  .replaceAll("0S", "--")
                                  .replaceAll("M", "min")}
                              </button>
                            </div>
                          </div>
                        </div>
                        {card == recipe.RecipeId && column == 2 && (
                          <>
                            <div className="rec-extra">
                              <h6>{recipe.Name}</h6>
                              <h6 className="mt-3">Recipe Ingredients</h6>
                              <ul>
                                {recipe.IngredientText.replaceAll("(", " ")
                                  .replaceAll(")", " ")
                                  .replaceAll('"', " ")
                                  .split(", ")
                                  .map((str, index) => (
                                    <li key={index}>{str}</li>
                                  ))}
                              </ul>
                              <h6>Recipe Instruction</h6>
                              <ul>
                                {recipe.RecipeInstructions.replaceAll("c(", " ")
                                  .replaceAll(")", " ")
                                  .replaceAll('"', " ")
                                  .split(", ")
                                  .map((str, index) => (
                                    <li key={index}>{str}</li>
                                  ))}
                              </ul>
                            </div>
                            <Chart
                              chartType="PieChart"
                              data={dataset}
                              options={options}
                              width={"100%"}
                              height={"200px"}
                            />
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="col-lg-4 rec-col">
                <div className="meal-time">
                  <h4>Dinner</h4>
                </div>
                {recommendations.slice(10, 15).map((recipe) => {
                  return (
                    <>
                      <div key={recipe.RecipeId} className="rec-card">
                        <div className="card-main">
                          <div
                            className="rec-img"
                            onClick={() => selectbtn(recipe.Calories)}
                          >
                            <img
                              className="recimg"
                              src={recipe.Images}
                              alt="cardimg"
                            />
                          </div>
                          <div className="rec-content">
                            <h5
                              onClick={() => {
                                chartClicked(recipe);
                                setColumn(3);
                              }}
                            >
                              {recipe.Name.slice(0, 17) + "..."}
                            </h5>
                            <p>
                              <strong>Calories</strong> : {recipe.Calories}
                            </p>
                            <ReactStars
                              count={5}
                              value={recipe.AggregatedRating}
                              // onChange={ratingChanged}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                            />
                            <div className="rec-card-botbar">
                              <button className="select-btn">
                                {recipe.RecipeCategory}
                              </button>
                              <button className="time-btn">
                                <img
                                  className="clock"
                                  src={require("../../assets/images/clock.png")}
                                  alt="clock"
                                />
                                {recipe.PrepTime.replaceAll("PT", "")
                                  .replaceAll("H", "min")
                                  .replaceAll("0S", "--")
                                  .replaceAll("M", "min")}
                              </button>
                            </div>
                          </div>
                        </div>
                        {card == recipe.RecipeId && column == 3 && (
                          <>
                            <div className="rec-extra">
                              <h6>{recipe.Name}</h6>
                              <h6 className="mt-3">Recipe Ingredients</h6>
                              <ul>
                                {recipe.IngredientText.replaceAll("(", " ")
                                  .replaceAll(")", " ")
                                  .replaceAll('"', " ")
                                  .split(", ")
                                  .map((str, index) => (
                                    <li key={index}>{str}</li>
                                  ))}
                              </ul>
                              <h6>Recipe Instruction</h6>
                              <ul>
                                {recipe.RecipeInstructions.replaceAll("c(", " ")
                                  .replaceAll(")", " ")
                                  .replaceAll('"', " ")
                                  .split(", ")
                                  .map((str, index) => (
                                    <li key={index}>{str}</li>
                                  ))}
                              </ul>
                            </div>
                            <Chart
                              chartType="PieChart"
                              data={dataset}
                              options={options}
                              width={"100%"}
                              height={"200px"}
                            />
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <Pie data={dataset}/> */}
          {/* <TableauEmbed sourceUrl="https://public.tableau.com/views/starebucks/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link" /> */}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
