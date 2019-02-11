fix = function () {
    var text = $.trim($("#input").val());
    text = text.replaceAll("&", "&amp;");
    text = text.replaceAll(">", "&gt;");
    text = text.replaceAll("<", "&lt;");
    $("#input").val(text);
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

add = function (type, info) {
    var content = $("#content").val();
    var html = "";
    var text = $.trim($("#input").val());
    var i, j;
    $("#input").val("");
    if (type == 'code') {
        html = "<pre><code class='" + info + "'>" + text + "</code></pre>";
    } else if (type == 'text') {
        var a = text.split("\n");
        for (i = 0; i < a.length; i++) {
            if ($.trim(a[i]))
                html += "<p>" + a[i] + "</p>";
        }
    } else if (type == 'block') {
        var a = text.split("\n");
        for (i = 0; i < a.length; i++) {
            if ($.trim(a[i]))
                html += "<blockquote class='blockquote'><p class='mb-0'>" + a[i] + "</p></blockquote>";
        }
    } else if (type == 'lead') {
        var a = text.split("\n");
        for (i = 0; i < a.length; i++) {
            if ($.trim(a[i]))
                html += "<p class='lead'>" + a[i] + "</p>";
        }
    } else if (type == 'footer') {
        var a = text.split("\n");
        for (i = 0; i < a.length; i++) {
            if ($.trim(a[i]))
                html += "<footer class='blockquote-footer'>" + a[i] + "</footer>";
        }
    } else if (type == 'sub') {
        $("#input").val(text + "<sub></sub>")
    } else if (type == 'sup') {
        $("#input").val(text + "<sup></sup>")
    } else if (type == 'hr') {
        html += "<hr/>";
    } else if (type == 'list') {
        html += "<" + info + ">";
        var paragraphs = text.split("\n");
        for (i = 0; i < paragraphs.length; i++) {
            html += "<li>" + paragraphs[i] + "</li>";
        }
        html += "</" + info + ">";
    } else if (type == 'image') {
        html = "<div class='center'><img src='" + text + "' /></div>";
    } else if (type == 'ad') {
        html = '<?php include "googleAd.php";?>';
    } else if (type == 'a') {
        var url = prompt("URL?", "home");
        if (!url)
            url = "home";
        html = "<a href='" + url + "'>" + text + "</a>";
    } else if (type == 'table') {
        var rows = text.split("\n");
        html = "<table>";
        html += "<tr>";
        var cells = rows[0].split("\t");
        for (j = 0; j < cells.length; j++) {
            html += "<th>" + cells[j] + "</th>";
        }
        html += "</tr>";
        for (i = 1; i < rows.length; i++) {
            html += "<tr>";
            var cells = rows[i].split("\t");
            for (j = 0; j < cells.length; j++) {
                html += "<td>" + cells[j] + "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";
    } else {
        html = "<" + type + ">" + text + "</" + type + ">";
    }
    content = content + html;
    $("#html").val("<!DOCTYPE html><html><head><title>" + $("#title").val() + '</title></head><body><h1>' + $("#title").val() + '</h1><hr/>' + content + '</body><script src="src/index.js"></script></html>');
    $("#blog").html(content);
    $("#content").val(content);
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
};

$("form").on("submit", function (event) {
    event.preventDefault();
    console.log($(this).serialize());
});

