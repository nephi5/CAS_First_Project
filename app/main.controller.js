import {default as initReminderDetailCtrl} from './reminder-detail/reminder-detail.controller';
import {default as initROCtrl} from './reminder-overview/reminder-overview.controller'
import {default as initFPCtrl} from './reminder-overview/filter-panel.controller';

class MainController {
    constructor() {
        this.registerListener();
        if (sessionStorage.currentView === 'overview') {
            this.renderReminderOverviewView();
        }
    }

    switchStyles(style) {
        console.log(`Switching styles to: ${style}`);
    }

    registerListener() {
        $('.top-buttons select').on('change', (event) => {
            this.switchStyles(event.target.value);
        });
    }

    renderReminderOverviewView() {
        let mainViewEl = $('.main-view');
        let template = Handlebars.templates['reminder-overview-view'];
        mainViewEl.empty();
        mainViewEl.append(template);
        window.ROCtrl = initROCtrl();
        window.FPCtrl = initFPCtrl();
    }

    renderReminderDetailView() {
        $('.main-view').empty();
        window.RDCtrl = initReminderDetailCtrl('create');

    }

    renderReminderDetailViewById(id) {
        $('.main-view').empty();
        window.RDCtrl = initReminderDetailCtrl('edit', id);
    }
}

function initMainController () {
    return new MainController();
}

export default initMainController;