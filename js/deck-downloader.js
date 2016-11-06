$(document).ready(function () {
    var deckUrl = location.href.substr(location.href.lastIndexOf('/') + 1) + '&Text=5';
    var deckName = $('#s_result>a').html() + '-' + $('#main>h2').html().split('<span>')[0];
    $.ajax(deckUrl).then(function (responseData) {
        var deckData = responseData.substring(responseData.lastIndexOf('<pre>') + 5, responseData.lastIndexOf('</pre>'));
        console.log(deckData);
        var blob = new Blob([deckData], {type: "text/plain;charset=utf-8"});
        saveAs(blob, deckName + '.ydk');
    });
});
