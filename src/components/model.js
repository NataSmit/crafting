export default class Model {
  constructor (itemList, recipeList, result=[]) {
    this.itemList = itemList;
    this.recipeList = recipeList;
    this.resultList = result;
  }

  isEqualToRecipe(recipeId, ingredientsNames) {

    //recipeObj будут ids, нужно достать obj
    console.log('model', recipeId, ingredientsNames)
    const recipeObj = this.recipeList.find(recipe => recipe.id == recipeId)
    const correctIngredients = Object.values(recipeObj.ingredients)
    console.log('correctIngredients', correctIngredients)
    const comparedArr = correctIngredients.filter(i => ingredientsNames.includes(i))
    console.log('comparedArr', comparedArr, comparedArr.length)
    const result = comparedArr.length === correctIngredients.length
    console.log('result model', result)
    return {result, recipeObj}
  }

  addToResult(item) {
    this.resultList.push(item)
  }



}