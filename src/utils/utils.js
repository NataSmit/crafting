export function getDataFromLocalStorage() {
  let ingredients;
  let recipes;
  try {
    ingredients = JSON.parse(localStorage.getItem('ingredientsList'));
    recipes = JSON.parse(localStorage.getItem('recipeList'));
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

const initialItems = [
  {
    name: 'Колеса',
    id: Date.now() + Math.random(),
  },
  {
    name: 'Кабина',
    id: Date.now() + Math.random(),
  },
  {
    name: 'Руль',
    id: Date.now() + Math.random(),
  },
  {
    name: '2 колеса',
    id: Date.now() + Math.random(),
  },
  {
    name: 'Педали',
    id: Date.now() + Math.random(),
  },
  {
    name: 'Руль',
    id: Date.now() + Math.random(),
  },
];
const initialRecipes = [
  {
    name: 'Машина',
    id: Date.now() + Math.random(),
    ingredients: {
      item1: 'Колеса',
      item2: 'Кабина',
      item3: 'Руль',
    },
  },
  {
    name: 'Велосипед',
    id: Date.now() + Math.random(),
    ingredients: {
      item1: '2 колеса',
      item2: 'Педали',
      item3: 'Руль',
    },
  },
];

export const recipesForRender = [
  ...initialRecipes,
  ...(JSON.parse(localStorage.getItem('recipeList')) || []),
];
export const ingredientsForRender = [
  ...initialItems,
  ...(JSON.parse(localStorage.getItem('ingredientsList')) || []),
];
