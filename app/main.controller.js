class MainController {
    constructor() {
        this.initListener();
    }

    switchStyles(style) {
        console.log(`Switching styles to: ${style}`);
    }

    initListener() {
        $('.top-buttons select').on('change', (event) => {
            this.switchStyles(event.target.value);
        });
    }
}

function initMainController () {
    return new MainController();
}

export default initMainController;