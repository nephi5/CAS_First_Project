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
        mainViewEl.append(template);
    }
}

function initMainController () {
    return new MainController();
}

export default initMainController;