import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
import re



def recommendFood(dataset, target_calorie, num_recommendations=1000, calorie_tolerance=50):
    data = dataset

    k= 25000 # dataset size

    model = NearestNeighbors(n_neighbors=k, algorithm='auto')
    model.fit(data[['Calories']].values)

    # Find the nearest neighbors to the input calorie value
    distances, indices = model.kneighbors([[target_calorie]])

    # Extract the recommended RecipeIds
    recommended_recipe_ids = data['RecipeId'].iloc[indices[0]].tolist()

    unique_recipe_ids = []
    for recipe_id in recommended_recipe_ids:
        if recipe_id not in unique_recipe_ids:
            unique_recipe_ids.append(recipe_id)

    # Retrieve all details of the recommended recipes within calorie tolerance
    recommended_recipes = data[data['RecipeId'].isin(unique_recipe_ids)]
    recommended_recipes = recommended_recipes[
        (recommended_recipes['Calories'] >= target_calorie - calorie_tolerance) &
        (recommended_recipes['Calories'] <= target_calorie + calorie_tolerance)
    ][:num_recommendations]

  
    # recommendations_json = recommended_recipes.to_json(orient='records')


    return recommended_recipes




# Function to recommend recipes based on ingredients
def recommend_recipes_by_ingredients(dataset,num_recommendations, input_ingredients):

    def preprocess_ingredient_parts(row):
        return row.replace('c', '')
    
    dataset['IngredientText'] = dataset['RecipeIngredientParts'].apply(preprocess_ingredient_parts)

# Function to extract content within double quotes
    pattern = r'"(.*?)"'
    def extract_content_within_quotes(row):
        matches = re.findall(pattern, row)
        if matches:
          return matches[0]
        else:
          return ''

    dataset['Images'] = dataset['Images'].apply(extract_content_within_quotes)




# Create a TF-IDF vectorizer for ingredient text
    tfidf_vectorizer = TfidfVectorizer()
    ingredient_matrix = tfidf_vectorizer.fit_transform(dataset['IngredientText'])

# Create the KNN model
    knn_model = NearestNeighbors(n_neighbors=num_recommendations)  # Adjust the number of neighbors as needed
    knn_model.fit(ingredient_matrix)

    input_ingredient_text = ' '.join(input_ingredients)

    # Transform the input ingredients using the same TF-IDF vectorizer
    input_ingredient_matrix = tfidf_vectorizer.transform([input_ingredient_text])

    # Find the k-nearest neighbors based on input ingredients
    _, indices = knn_model.kneighbors(input_ingredient_matrix)

    # Get the recommended recipes
    recommended_recipes = dataset.iloc[indices[0]]
    

    return recommended_recipes.to_json(orient='records')
