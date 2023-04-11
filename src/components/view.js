export default class View {
  constructor() {
    this.table = document.querySelector('.table');
    this.result = document.querySelector('.result');
    this.itemList = document.querySelector('.items__list')
  }

  addItem(item, container) {
    const title = item.name || item
    const listItem = document.createElement('li')
    listItem.classList.add('item')
    const text = document.createTextNode(title)
    listItem.appendChild(text)
    container.appendChild(listItem)
  }

  renderItems(itemArr, container) {
    itemArr.forEach(element => {
      this.addItem(element, container)
    });
  }


}
