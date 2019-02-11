function loadPageFormat() {
    u = window.location.href.split('\/');
    u = u[u.length - 1];

    if (localStorage.getItem("com.solegaonkar.url") && localStorage.getItem("com.solegaonkar.title") && localStorage.getItem("com.solegaonkar.html")) {
        document.getElementById("blog").innerHTML = localStorage.getItem("com.solegaonkar.html");
        window.history.pushState("string", localStorage.getItem("title"), localStorage.getItem("com.solegaonkar.url"));
        document.title = localStorage.getItem("com.solegaonkar.title");
        localStorage.removeItem("com.solegaonkar.html");
        localStorage.removeItem("com.solegaonkar.title");
        localStorage.removeItem("com.solegaonkar.url");
    } else if (u != "" && u != "index.html") {
        localStorage.setItem("com.solegaonkar.html", document.body.innerHTML);
        localStorage.setItem("com.solegaonkar.url", window.location.href);
        localStorage.setItem("com.solegaonkar.title", document.title);
        window.location = "index.html";
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("blog").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "home.html", true);
        xhttp.send();
    }
}