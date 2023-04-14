export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    
    
    view.on('craft', this.craft.bind(this))
  }

  craft({recipeId, ingredientsNames}) {
    console.log('craft', recipeId, ingredientsNames)
    const {result, recipeObj} = this.model.isEqualToRecipe(recipeId, ingredientsNames);
    console.log('controller', result, recipeObj)
    if(result) {
      this.model.addToResult(recipeObj)
      console.log('this.model.resultList', this.model.resultList)
      this.view.addToResult(this.model.resultList)
      this.view.removeRecipe()
      this.view.removeIngredients()
    } else {
      alert("Ингредиенты выбраны не верно")
    }
  }




}