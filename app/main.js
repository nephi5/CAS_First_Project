import {} from './model/reminders.model';
import {default as initReminderOverviewCtrl} from './reminder-overview/reminder-overview.controller';
import {default as initFilterPanelCtrl} from './reminder-overview/filter-panel.controller';
import {default as initMainCtrl} from './main.controller';

window.FPCtrl = initFilterPanelCtrl();
window.MCtrl = initMainCtrl();
window.ROCtrl = initReminderOverviewCtrl();