export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback)
  }

  emit(type, arg) {
    console.log('arg', arg)
    console.log('emit is working')
    if (this.events[type]) {
      this.events[type].forEach(callback => callback(arg))
    }
  }
}