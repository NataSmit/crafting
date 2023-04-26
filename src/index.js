import './index.css';
import View from './components/view';
import Model from './components/model';
import Controller from './components/controller';

const view = new View();
const model = new Model();
const controller = new Controller(model, view);
controller.render();
