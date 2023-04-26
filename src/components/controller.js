import {
  findItemInTheList, showIngredientsList,
} from '../utils/utils';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.resetBtn.addEventListener('click', this.handleResetBtn);

    view.on('craft', this.craft.bind(this));
    view.on('createRecipe', this.createRecipe.bind(this));
    view.on('dropRecipe', this.dropRecipe.bind(this));
    view.on('dropIngredients', this.dropIngredients.bind(this));
  }

  craft({ recipeId, ingredientsNames }) {
    const { result, recipeObj } = this.model.isEqualToRecipe(
      recipeId,
      ingredientsNames,
    );
    if (result) {
      this.model.addToResult(recipeObj);
      this.view.addToResult(recipeObj);
      this.view.removeRecipe();
      this.view.removeIngredients();
    } else {
      alert('составные части выбраны не верно/не полностью');
    }
  }

  createRecipe({ inputList, name }) {
    const { newRecipe, newIngredients } = this.model.createNewRecipe(inputList, name);
    this.view.createNode(newRecipe, this.view.recipeListContainer);
    this.view.renderItems(newIngredients, this.view.itemList);
  }

  dropRecipe({ recipeId, eTarget }) {
    const obj = findItemInTheList(recipeId, this.model.recipeList);
    if (obj) {
      if (eTarget.className === 'table__recipe-list') {
        const checkResult = this.view.checkDroppedRecipe();
        if (checkResult) {
          this.view.appendItem(obj.id, eTarget);
          showIngredientsList(obj);
        }
      } else {
        this.view.appendItem(obj.id, eTarget);
      }
    } else {
      alert('Это область только для чертежа');
    }
  }

  dropIngredients({ ingredientId, eTarget }) {
    const ingredient = findItemInTheList(ingredientId, this.model.itemList);

    if (ingredient) {
      this.view.appendItem(ingredient.id, eTarget);
    } else {
      alert('Это область только для частей');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleResetBtn() {
    localStorage.removeItem('recipeList');
    localStorage.removeItem('ingredientsList');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  render() {
    this.view.renderItems(this.model.itemList, this.view.itemList);
    this.view.renderItems(this.model.recipeList, this.view.recipeListContainer);
  }
}
