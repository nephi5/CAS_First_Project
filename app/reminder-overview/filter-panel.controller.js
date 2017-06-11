
class FilterPanelController {
    constructor() {
        this.renderUI();
        this.sortedBy = '';
    }

    renderUI() {
        let template = Handlebars.templates['filter-panel'];
        $('.filter-panel').append(template);
    }

    toggleFinished() {
        $('.finished-filter .btn').toggleClass('btn-active');
    }

    setFilterBy(filterBy) {
        if (this.sortedBy !== filterBy) {
            this.sortedBy = filterBy;
            $('.filter-panel .first-button-group .btn').removeClass('btn-active');
            $(`.filter-panel .btn[filter-option="${filterBy}"]`).addClass('btn-active');
            console.log(`filtering by: ${filterBy}`);
        }
    }
}

function initFilterPanelController() {
    return new FilterPanelController();
}

export default initFilterPanelController;