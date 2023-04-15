export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    
    
    view.on('craft', this.craft.bind(this))
    view.on('createRecipe', this.createRecipe.bind(this))
    view.on('dropRecipe', this.dropRecipe.bind(this))
  }

  craft({recipeId, ingredientsNames}) {
    console.log('craft', recipeId, ingredientsNames)
    const {result, recipeObj} = this.model.isEqualToRecipe(recipeId, ingredientsNames);
    console.log('controller', result, recipeObj)
    if(result) {
      this.model.addToResult(recipeObj)
      console.log('this.model.resultList', this.model.resultList)
      this.view.addToResult(recipeObj)
      this.view.removeRecipe()
      this.view.removeIngredients()
    } else {
      alert("составные части выбраны не верно/не полностью")
    }
  }

  createRecipe({newRecipe, newIngredients}) {
    this.model.addToRecipeList(newRecipe)
    this.view.addItem(newRecipe, this.view.recipeListContainer)
    this.view.renderItems(newIngredients, this.view.itemList)
  }

  dropRecipe(recipeId) {
    const res = this.model.isPresentInRecipeList(recipeId)
    console.log('res', res)
  }


}