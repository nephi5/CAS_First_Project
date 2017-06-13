class MainController {
    constructor() {
        this.registerListener();
    }

    switchStyles(style) {
        console.log(`Switching styles to: ${style}`);
    }

    registerListener() {
        $('.top-buttons select').on('change', (event) => {
            this.switchStyles(event.target.value);
        });
    }
}

function initMainController () {
    return new MainController();
}

export default initMainController;