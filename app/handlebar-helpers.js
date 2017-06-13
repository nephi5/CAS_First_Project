Handlebars.registerHelper('displayPriority', function (numOfStars) {
    let html = '';

    for (let x = 0; x < numOfStars; x++) {
        html += '<span class="priority-symbol">&#9733</span>';
    }
    return html;
});