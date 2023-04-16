import './index.html';
import './index.css';
import View from './components/view';
import Model from './components/model';
import Controller from './components/controller';

const itemListContainer = document.querySelector('.items__list');
const recipeListContainer = document.querySelector('.recipe__list');

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
];

const recipesForRender = [...initialRecipes, ...JSON.parse(localStorage.getItem('recipeList')) || []]
const ingredientsForRender = [...initialItems, ...JSON.parse(localStorage.getItem('ingredientsList')) || []]

const view = new View();

// console.log('view', view)
view.renderItems(ingredientsForRender, itemListContainer);
view.renderItems(recipesForRender, recipeListContainer);

const model = new Model(ingredientsForRender, recipesForRender);
// console.log('model', model)
const controller = new Controller(model, view);

// view.getInputValues()

