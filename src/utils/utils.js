export function parseIngredients() {
  return JSON.parse(localStorage.getItem('ingredientsList'));
}

export function parseRecipes() {
  return JSON.parse(localStorage.getItem('recipeList'));
}

export function getDataFromLocalStorage() {
  let ingredients;
  let recipes;
  try {
    ingredients = parseIngredients();
    recipes = parseRecipes();
  } catch (er) {
    // eslint-disable-next-line no-console
    console.log(er);
  }

  return { ingredients, recipes };
}

export function saveToLocalStorage(newRecipe, newIngredients) {
  localStorage.setItem('recipeList', JSON.stringify(newRecipe));
  localStorage.setItem('ingredientsList', JSON.stringify(newIngredients));
}

export function findItemInTheList(ItemId, arr) {
  const item = arr.find(
    (recipe) => String(recipe.id) === String(ItemId),
  );

  return item;
}

export function showIngredientsList(recipeObj) {
  const correctIngredients = Object.values(recipeObj.ingredients);
  alert(`Для создания предмета Вам необходимы следующие предметы: ${correctIngredients}`);
}

export function clearInputsValues(arr, nameInput) {
  const newArr = [...arr, nameInput];
  newArr.forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.value = '';
  });
}

export function handleLocalStorage(newRecipe, newIngredients) {
  const { ingredients, recipes } = getDataFromLocalStorage();
  if (ingredients && recipes) {
    saveToLocalStorage(
      [...recipes, newRecipe],
      [...ingredients, ...newIngredients],
    );
  } else {
    saveToLocalStorage([newRecipe], newIngredients);
  }
}
