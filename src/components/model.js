import { handleLocalStorage } from '../utils/utils';

export default class Model {
  constructor(itemList, recipeList, result = []) {
    this.itemList = itemList;
    this.recipeList = recipeList;
    this.resultList = result;
  }

  isEqualToRecipe(recipeId, ingredientsNames) {
    const recipeObj = this.recipeList.find(
      (recipe) => String(recipe.id) === String(recipeId),
    );
    if (recipeObj) {
      const correctIngredients = Object.values(recipeObj.ingredients);
      const comparedArr = correctIngredients.filter((i) => ingredientsNames.includes(i));
      if (ingredientsNames.length > correctIngredients.length) {
        alert('Выбраны  лишние части');
      } else {
        const result = comparedArr.length === correctIngredients.length;
        return { result, recipeObj };
      }
    }

    return false;
  }

  addToResult(item) {
    this.resultList.push(item);
  }

  addToRecipeList(recipe) {
    this.recipeList.push(recipe);
  }

  addToItemList(itemsArr) {
    this.itemList = [...this.itemList, ...itemsArr];
  }

  createNewRecipe(inputList, name) {
    const valueList = inputList.map((input) => input.value);
    const correctValueList = valueList.filter((v) => Boolean(v));
    const newIngredients = correctValueList.map((ing) => ({
      id: Date.now() + Math.random(),
      name: ing,
    }));

    const ingredientsObj = correctValueList.reduce((obj, cur, i) => {
      const key = i + 1;
      obj[key] = cur;
      return obj;
    }, {});

    const newRecipe = {
      name,
      id: Date.now() + Math.random(),
      ingredients: { ...ingredientsObj },
    };

    this.addToRecipeList(newRecipe);
    this.addToItemList(newIngredients);

    handleLocalStorage(newRecipe, newIngredients);

    return { newRecipe, newIngredients };
  }
}
