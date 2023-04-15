import EventEmitter from "./eventEmitter";

export default class View extends EventEmitter{
  constructor() {
    super();
    this.table = document.querySelector('.table');
    this.result = document.querySelector('.result__list');
    this.recipeListContainer = document.querySelector('.recipe__list')
    this.itemList = document.querySelector('.items__list')
    this.tableItems = document.querySelector('.table__items-list') //'.table__items'
    this.tableRecipe = document.querySelector( '.table__recipe-list' ) //'.table__recipe'
    this.craftBtn = document.querySelector('.table__button')
    this.form = document.querySelector('.newRecipe__form')

    this.tableItems.addEventListener('dragover', this.dragover)
    this.tableItems.addEventListener('drop', this.dropIngredients)

    this.itemList.addEventListener('dragover', this.dragover)
    this.itemList.addEventListener('drop', this.dropIngredients)

    this.tableRecipe.addEventListener('dragover', this.dragover)
    this.tableRecipe.addEventListener('drop', this.dropRecipe.bind(this))

    this.craftBtn.addEventListener('click', this.handleCraftBtn.bind(this))
    this.form.addEventListener('submit', this.handleFormSubmit.bind(this))

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

  addToResult(createdItem) {
    this.addItem(createdItem, this.result)
    
  }

  drag(ev) {
    const itemId = ev.target.id
    ev.dataTransfer.setData("id", itemId);
  }

  dropRecipe(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("id");
    this.emit('dropRecipe', data)
    console.log('ev.dataTransfer', ev.dataTransfer)
    const checkResult = this.checkDroppedRecipe()
    console.log('checkResult', checkResult)
    console.log('document.getElementById(data)', document.getElementById(data))
    if (checkResult) {
      ev.target.appendChild(document.getElementById(data));
    }
    
    
  }

  checkDroppedRecipe() {
    const recipeList = this.tableRecipe.childNodes
    if(recipeList.length) {
      alert("Можно добавить только один рецепт")
      return false
    } else {
      return true
    }
  }

  dropIngredients(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("id");
    console.log('ev target', ev.target)
    ev.target.appendChild(document.getElementById(data));
  }

  dragover(e) {
    e.preventDefault()
  }


  handleCraftBtn() {
    const recipeId = this.tableRecipe.childNodes[0].id
    console.log(this.tableRecipe.childNodes[0])
    const ingredients = Array.from(this.tableItems.childNodes)
    console.log('ingredients', ingredients)
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

  removeValues(arr, nameInput) {
    const newArr = [...arr, nameInput]
    newArr.forEach((input) => {
      input.value = ''
    })

  }

  handleFormSubmit(e) {
    e.preventDefault()
    const nameInput = document.querySelector('.name')
    console.log('nameInput', nameInput)
    const name = nameInput.value
    console.log('name', name)
    const inputList = Array.from(document.querySelectorAll('.ingredient'))
    console.log('inputList', inputList)
    const valueList = inputList.map(input => input.value)
    console.log('valueList', valueList)
    const correctValueList = valueList.filter(v => Boolean(v))
    console.log('correctValueList', correctValueList)
    const newIngredients = correctValueList.map((ing) => ({id: Date.now() + Math.random(), name: ing}))
    
    const ingredientsObj = correctValueList.reduce((obj, cur, i) => {
      let key = i + 1
      obj[key] = cur
      return obj
    }, {})

    
    const newRecipe = {
      name,
      id: Date.now() + Math.random(),
      ingredients: {...ingredientsObj}
    }

    console.log('newIngredients', newIngredients)
    this.emit('createRecipe', {newRecipe, newIngredients})
    this.removeValues(inputList, nameInput)
    
  }


  


}
