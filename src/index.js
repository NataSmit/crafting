import './index.html';
import './index.css'
import View from './components/view'
const itemListContainer = document.querySelector('.items__list')
const recipeListContainer = document.querySelector('.recipe__list')

const initialItems = ["Колеса", "Кабина", "Руль"]
const initialRecipes = [
  {
    name: 'Машина',
    item1: "Колеса",
    item1: "Кабина",
    item1: "Руль",
  }
]

const view = new View()

console.log('view', view)
view.renderItems(initialItems, itemListContainer)
view.renderItems(initialRecipes, recipeListContainer)
