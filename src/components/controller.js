import { getDataFromLocalStorage, saveToLocalStorage } from '../utils/utils';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('craft', this.craft.bind(this));
    view.on('createRecipe', this.createRecipe.bind(this));
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
      // eslint-disable-next-line no-alert
      alert('составные части выбраны не верно/не полностью');
    }
  }

  createRecipe({ newRecipe, newIngredients }) {
    const { ingredients, recipes } = getDataFromLocalStorage();
    this.model.addToRecipeList(newRecipe);
    this.model.addToItemList(newIngredients);
    const newRecipeArrLS = [];
    newRecipeArrLS.push(newRecipe);
    const newIngredientsLS = [];
    newIngredientsLS.push(...newIngredients);
    if (ingredients && recipes) {
      saveToLocalStorage(
        [...recipes, newRecipe],
        [...ingredients, ...newIngredients],
      );
    } else {
      saveToLocalStorage([newRecipe], newIngredients);
    }

    this.view.addItem(newRecipe, this.view.recipeListContainer);
    this.view.renderItems(newIngredients, this.view.itemList);
  }
}
