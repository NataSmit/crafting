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
    if (recipeObj) {
      const correctIngredients = Object.values(recipeObj.ingredients)
      console.log('correctIngredients', correctIngredients)
      const comparedArr = correctIngredients.filter(i => ingredientsNames.includes(i))
      console.log('comparedArr', comparedArr, comparedArr.length)
      const result = comparedArr.length === correctIngredients.length
      console.log('result model', result)
      return {result, recipeObj}
    } else {
      alert('Добавлен не верный рецепт')
      return false
    }
    
  }

  addToResult(item) {
    this.resultList.push(item)
  }

  addToRecipeList(recipe) {
    this.recipeList.push(recipe)
  }

  createRecipe(recipe) {
    this.recipeList.push(recipe)
    console.log('this.recipeList', this.recipeList)
  }

  isPresentInRecipeList(recipeId) {
   return this.recipeList.find(recipe => recipe.id == recipeId)
  }



}