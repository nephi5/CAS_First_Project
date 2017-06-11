(function () {
    let scriptTag = $('<script src="dist/templates.js"></script>');
    let scriptTag2 = $('<script src="dist/bundle.js"></script>');
    let bodyEl = $('body');
    bodyEl.append(scriptTag);
    bodyEl.append(scriptTag2);
}());
