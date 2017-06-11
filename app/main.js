import {} from './model/reminders.model';
import {} from './reminder-overview/reminder-overview.controller';
import {default as FilterPanelCtrl} from './reminder-overview/filter-panel.controller';

FilterPanelCtrl.renderUI();

window.FPCtrl = FilterPanelCtrl;
