ajaxRunning = false;
loadHtmlPage = function (url) {
    ajaxRunning = true;
    $('html, body').css("cursor", "wait");
    $.get(url, function (data, status) {
        if (status == "success") {
            document.title = data.split('<title>')[1].split('</title')[0];
            $("#blog").html(data.split('<body>')[1].split('</body>')[0]);
            sanitize();
        }
        ajaxRunning = false;
        $('html, body').css("cursor", "auto");
    });
};

window.onpopstate = function (event) {
    console.log("Document Location: " + document.location);
    loadHtmlPage(document.location);
};

sanitize = function () {
    setTimeout(function () {
        $(".link").each(function () {
            $(this).click(function (e) {
                e.preventDefault();
                if (ajaxRunning)
                    return false;
                url = $(this).attr("href");
                window.history.pushState("state", document.title, url);
                loadHtmlPage(url);
                return false;
            });
        });
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    }, 100);
};

$(document).ready(function () {
    sanitize();
});

(function() {
var cx = '001416028576861424674:j9osquukerm';
var gcse = document.createElement('script');
gcse.type = 'text/javascript';
gcse.async = true;
gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(gcse, s);
})();
