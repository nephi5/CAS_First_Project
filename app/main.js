import {default as initMainCtrl} from './main.controller';

if (!sessionStorage.currentView) {
    sessionStorage.setItem('currentView', 'overview');
}

window.MCtrl = initMainCtrl();