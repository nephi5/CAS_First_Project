
class FilterPanelController {
    constructor() {
        this.renderUI();
        sessionStorage.orderBy = sessionStorage.orderBy ? sessionStorage.orderBy: null;
        sessionStorage.filterBy = sessionStorage.filterBy ? sessionStorage.filterBy: true;

        if (!JSON.parse(sessionStorage.filterBy)) {
            $('.finished-filter .btn').addClass('btn-active');
        }

        $(`.filter-panel .btn[filter-option="${sessionStorage.orderBy}"]`).addClass('btn-active');

    }

    renderUI() {
        let template = Handlebars.templates['filter-panel'];
        $('.filter-panel').append(template);
    }

    toggleFinished() {
        sessionStorage.filterBy = !JSON.parse(sessionStorage.filterBy);
        console.log('sessionStorage.filterBy');
        console.log(sessionStorage.filterBy);
        $('.finished-filter .btn').toggleClass('btn-active');
        window.ROCtrl.filterBy();
    }

    setFilterBy(orderBy) {
        if (sessionStorage.orderBy !== orderBy) {
            sessionStorage.orderBy = orderBy;
            $('.filter-panel .first-button-group .btn').removeClass('btn-active');
            $(`.filter-panel .btn[filter-option="${orderBy}"]`).addClass('btn-active');
            window.ROCtrl.filterBy();
        }
    }
}

function initFilterPanelController() {
    return new FilterPanelController();
}

export default initFilterPanelController;