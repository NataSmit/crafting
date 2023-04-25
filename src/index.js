import './index.css';
import View from './components/view';
import Model from './components/model';
import Controller from './components/controller';
import { ingredientsForRender, recipesForRender } from './utils/utils';

const itemListContainer = document.querySelector('.items__list');
const recipeListContainer = document.querySelector('.recipe__list');

const view = new View();
view.renderItems(ingredientsForRender, itemListContainer);
view.renderItems(recipesForRender, recipeListContainer);
const model = new Model(ingredientsForRender, recipesForRender);
// eslint-disable-next-line no-unused-vars
const controller = new Controller(model, view);
