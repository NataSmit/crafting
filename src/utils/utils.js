export function getDataFromLocalStorage() {
  let ingredients;
  let recipes;
  try {
    ingredients = JSON.parse(localStorage.getItem('ingredientsList'));
    recipes = JSON.parse(localStorage.getItem('recipeList'));
  } catch (er) {
    console.log(er);
  }

  return { ingredients, recipes };
}

export function saveToLocalStorage(newRecipe, newIngredients) {
  localStorage.setItem('recipeList', JSON.stringify(newRecipe))
  localStorage.setItem('ingredientsList', JSON.stringify(newIngredients))
}
