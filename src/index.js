import './index.html';
import './index.css'
import View from './components/view'
import Model from './components/model'
import Controller from './components/controller';
const itemListContainer = document.querySelector('.items__list')
const recipeListContainer = document.querySelector('.recipe__list')


const initialItems = [
  {
   name: "Колеса",
   id: Date.now() + Math.random()
  },
  {name: "Кабина",
   id: Date.now() + Math.random()},
  {name: "Руль",
  id: Date.now() + Math.random()}
]
const initialRecipes = [
  {
    name: 'Машина',
    id: Date.now() + Math.random(),
    ingredients: {
      item1: "Колеса",
      item2: "Кабина",
      item3: "Руль",
    }
  }
]


const view = new View()

//console.log('view', view)
view.renderItems(initialItems, itemListContainer)
view.renderItems(initialRecipes, recipeListContainer)

const model = new Model(initialItems, initialRecipes)
//console.log('model', model)
const controller = new Controller(model, view)

