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
      const result = comparedArr.length === correctIngredients.length;
      return { result, recipeObj };
    }
    alert('Добавлен неверный рецепт');
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

  createRecipe(recipe) {
    this.recipeList.push(recipe);
  }
}
