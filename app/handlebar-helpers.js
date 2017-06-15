Handlebars.registerHelper('displayPriority', function (numOfStars) {
    let html = '';

    for (let x = 0; x < numOfStars; x++) {
        html += '<span class="priority-symbol active">&#9733</span>';
    }
    return html;
});

Handlebars.registerHelper ("formatDate", function(datetime) {
    if (moment) {
        return moment(datetime).fromNow();
    }
    else {
        return datetime;
    }
});