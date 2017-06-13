import {default as initReminderOverviewCtrl} from './reminder-overview/reminder-overview.controller';
import {default as initFilterPanelCtrl} from './reminder-overview/filter-panel.controller';
import {default as initMainCtrl} from './main.controller';

if (!sessionStorage.currentView) {
    sessionStorage.setItem('currentView', 'overview');
}

window.MCtrl = initMainCtrl();
window.FPCtrl = initFilterPanelCtrl();
window.ROCtrl = initReminderOverviewCtrl();