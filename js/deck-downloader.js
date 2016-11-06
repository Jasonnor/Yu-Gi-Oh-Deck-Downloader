$(document).ready(function () {
    var deckUrl = location.href.substr(location.href.lastIndexOf('/') + 1) + '&Text=5';
    $.ajax(deckUrl).then(function (responseData) {
        var deckData = responseData.substring(responseData.lastIndexOf('<pre>') + 5, responseData.lastIndexOf('</pre>'));
        console.log(deckData);
    });
});
