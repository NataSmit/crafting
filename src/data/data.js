import { parseIngredients, parseRecipes } from '../utils/utils';

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

export const recipesForRender = [
  ...initialRecipes,
  ...parseRecipes() || [],
];
export const ingredientsForRender = [
  ...initialItems,
  ...parseIngredients() || [],
];
