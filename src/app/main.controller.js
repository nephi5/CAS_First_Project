import {default as initReminderDetailCtrl} from './reminder-detail/reminder-detail.controller';
import {default as initROCtrl} from './reminder-overview/reminder-overview.controller'
import {default as initFPCtrl} from './reminder-overview/filter-panel.controller';

class MainController {
    constructor() {
        if (sessionStorage.currentView === 'overview') {
            this.renderReminderOverviewView();
        }
    }

    switchStyles(style) {
        if (style === 'blackWhiteStyle') {
            sessionStorage.overallStyle = 'blackWhiteStyle';
            $('body').addClass('black-white');
        } else {
            sessionStorage.overallStyle = 'normal';
            $('body').removeClass('black-white');
        }
    }

    registerListener() {
        let currentVal = sessionStorage.overallStyle ? sessionStorage.overallStyle : 'normal';
        this.switchStyles(currentVal);
        $(".top-buttons select").val(currentVal);
        $('.top-buttons select').on('change', (event) => {
            this.switchStyles(event.target.value);
        });
    }

    renderReminderOverviewView() {
        let mainViewEl = $('.main-view');
        let template = Handlebars.templates['reminder-overview-view'];
        mainViewEl.empty();
        mainViewEl.append(template);
        this.registerListener();
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