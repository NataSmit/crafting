export default class Validator {
  constructor() {
    this.form = document.querySelector('.newRecipe__form')
    this.formButton = document.querySelector('.createRecipe__btn')
    this.nameInput = document.querySelector('.name')
    this.inputList = Array.from(document.querySelectorAll('.ingredient'))
  }

  checkValues() {
    const isActive = this.nameInput.value && this.inputList[0].value && this.inputList[1].value
    if (!isActive) {
      this.formButton.setAttribute('disabled', 'true')
    }
  }

}