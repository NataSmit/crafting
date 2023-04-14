import EventEmitter from "./eventEmitter";

export default class View extends EventEmitter{
  constructor() {
    super();
    this.table = document.querySelector('.table');
    this.result = document.querySelector('.result');
    this.itemList = document.querySelector('.items__list')
    this.tableItems = document.querySelector('.table__items')
    this.tableRecipe = document.querySelector('.table__recipe')
    this.craftBtn = document.querySelector('.table__button')

    this.tableItems.addEventListener('dragover', this.dragover)
    this.tableItems.addEventListener('drop', this.drop)

    this.tableRecipe.addEventListener('dragover', this.dragover)
    this.tableRecipe.addEventListener('drop', this.drop)

    this.craftBtn.addEventListener('click', this.handleCraftBtn.bind(this))

  }

  addItem(item, container) {
    
    const listItem = document.createElement('li')
    listItem.classList.add('item')
    listItem.setAttribute('id', `${item.id}`)
    listItem.setAttribute('name', `${item.name}`)
    listItem.setAttribute('draggable', 'true')
    const text = document.createTextNode(item.name)
    listItem.appendChild(text)
    container.appendChild(listItem)  
    listItem.addEventListener('dragstart', this.drag)
  }

  renderItems(itemArr, container) {
    itemArr.forEach(element => {
      this.addItem(element, container)
    });
  }

  addToResult(itemArr) {
    itemArr.forEach(element => {
      this.addItem(element, this.result)
    });
  }

  drag(ev) {
    const classText = ev.target.id
    console.log('ev.target', classText)
    
    ev.dataTransfer.setData("text", classText);
  }

  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log('data', data)
    ev.target.appendChild(document.getElementById(data));
  }

  dragover(e) {
    e.preventDefault()
  }

  handleCraftBtn() {
    const recipeId = this.tableRecipe.childNodes[0].id
    console.log(this.tableRecipe.childNodes[0])
    const ingredients = Array.from(this.tableItems.childNodes)
    const ingredientsNames = ingredients.map(i => i.getAttribute('name'))
    console.log('ingredients', ingredientsNames)
   // вызвать isEqualToRecipe(recipeId, itemsArr) из модели
    
   this.emit('craft', {recipeId, ingredientsNames})
  }

  removeRecipe() {
    const recipe = this.tableRecipe.childNodes[0]
    this.tableRecipe.removeChild(recipe)
  }

  removeIngredients() {
    const ingredients = Array.from(this.tableItems.childNodes)
    ingredients.forEach(item => {
      this.tableItems.removeChild(item)
    })
  }



}
