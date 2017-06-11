

function setFilterBy(filterBy) {
    $('.filter-panel .first-button-group .btn').removeClass('btn-active');
    $(`.filter-panel .btn[filter-option="${filterBy}"]`).addClass('btn-active');
    console.log(`filtering by: ${filterBy}`);

}

function renderUI() {
    let template = Handlebars.templates['filter-panel'];
    $('.filter-panel').append(template);
}

function toggleFinished() {
    $('.finished-filter .btn').toggleClass('btn-active');
}


export default { setFilterBy, renderUI, toggleFinished };