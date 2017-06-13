(function () {
    let scriptTag = $('<script src="dist/templates.js"></script>');
    let scriptTag2 = $('<script src="dist/bundle.js"></script>');
    let scripTag3 = $('<script src="app/handlebar-helpers.js"></script>');
    let bodyEl = $('body');
    bodyEl.append(scripTag3);
    bodyEl.append(scriptTag);
    bodyEl.append(scriptTag2);
}());
