/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import EventEmitter from './eventEmitter';
import { clearInputsValues } from '../utils/utils';

export default class View extends EventEmitter {
  constructor() {
    super();
    this.table = document.querySelector('.table');
    this.result = document.querySelector('.result__list');
    this.recipeListContainer = document.querySelector('.recipe__list');
    this.itemList = document.querySelector('.items__list');
    this.tableItems = document.querySelector('.table__items-list'); // '.table__items'
    this.tableRecipe = document.querySelector('.table__recipe-list'); // '.table__recipe'
    this.craftBtn = document.querySelector('.table__button');
    this.form = document.querySelector('.newRecipe__form');
    this.resetBtn = document.querySelector('.table__reset-btn');

    this.recipeListContainer.addEventListener('dragover', this.dragover);
    this.recipeListContainer.addEventListener('drop', this.dropRecipe.bind(this));

    this.tableItems.addEventListener('dragover', this.dragover);
    this.tableItems.addEventListener('drop', this.dropIngredients.bind(this));

    this.itemList.addEventListener('dragover', this.dragover);
    this.itemList.addEventListener('drop', this.dropIngredients.bind(this));

    this.tableRecipe.addEventListener('dragover', this.dragover);
    this.tableRecipe.addEventListener('drop', this.dropRecipe.bind(this));

    this.craftBtn.addEventListener('click', this.handleCraftBtn.bind(this));
    this.form.addEventListener('submit', this.handleNewRecipeFormSubmit.bind(this));
  }

  addItem(item, container) {
    const listItem = document.createElement('li');
    listItem.classList.add('item');
    listItem.setAttribute('id', `${item.id}`);
    listItem.setAttribute('name', `${item.name}`);
    listItem.setAttribute('draggable', 'true');
    const text = document.createTextNode(item.name);
    listItem.appendChild(text);
    container.appendChild(listItem);
    listItem.addEventListener('dragstart', this.drag);
  }

  renderItems(itemArr, container) {
    itemArr.forEach((element) => {
      this.addItem(element, container);
    });
  }

  addToResult(createdItem) {
    this.addItem(createdItem, this.result);
  }

  drag(ev) {
    const itemId = ev.target.id;
    ev.dataTransfer.setData('id', itemId);
    console.log('drag id', itemId);
  }

  dropRecipe(ev) {
    ev.preventDefault();
    const recipeId = ev.dataTransfer.getData('id');
    const eTarget = ev.target;
    this.emit('dropRecipe', { recipeId, eTarget });
  }

  appendItem(id, container) {
    container.appendChild(document.getElementById(id));
  }

  checkDroppedRecipe() {
    const recipeList = this.tableRecipe.childNodes;
    if (recipeList.length) {
      // eslint-disable-next-line no-alert
      alert('Можно добавить только один рецепт');
      return false;
    }
    return true;
  }

  dropIngredients(ev) {
    ev.preventDefault();
    const ingredientId = ev.dataTransfer.getData('id');
    const eTarget = ev.target;
    this.emit('dropIngredients', { ingredientId, eTarget });
  }

  dragover(e) {
    e.preventDefault();
  }

  handleCraftBtn() {
    const recipeNode = this.tableRecipe.childNodes;
    if (recipeNode.length !== 0) {
      const recipeId = this.tableRecipe.childNodes[0].id;
      const ingredients = Array.from(this.tableItems.childNodes);
      const ingredientsNames = ingredients.map((i) => i.getAttribute('name'));
      // вызвать isEqualToRecipe(recipeId, itemsArr) из модели
      this.emit('craft', { recipeId, ingredientsNames });
    } else {
      // eslint-disable-next-line no-alert
      alert('Выберите рецепт');
    }
  }

  removeRecipe() {
    const recipe = this.tableRecipe.childNodes[0];
    this.tableRecipe.removeChild(recipe);
  }

  removeIngredients() {
    const ingredients = Array.from(this.tableItems.childNodes);
    ingredients.forEach((item) => {
      this.tableItems.removeChild(item);
    });
  }

  handleNewRecipeFormSubmit(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.name');
    const name = nameInput.value;
    const inputList = Array.from(document.querySelectorAll('.ingredient'));
    this.emit('createRecipe', { inputList, name });
    clearInputsValues(inputList, nameInput);
  }
}
