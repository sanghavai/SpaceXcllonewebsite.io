const LoadHomepageTiles = () => {
    var e = new XMLHttpRequest;
    e.onreadystatechange = function () {
        4 == this.readyState && 200 == this.status && (addHomepageTiles(JSON.parse(this.responseText)),
            addHomepageScripts())
    }
        ,
        e.open("GET", contentBaseUrl + "/api/spacex-website/homepage-tiles", !0),
        e.send()
}
    ;
function addHomepageTiles(e) {
    if (!e || e.length < 1)
        return;
    let t = document.getElementById("placeholder");
    t && t.remove(),
        e.sort(function (e, t) {
            return e.position < t.position ? -1 : e.position >= t.position ? 1 : 0
        }),
        e.forEach(function (e) {
            let t = document.createElement("div");
            t.className = "section";
            let n = document.createElement("span");
            n.className = "background",
                n.setAttribute("role", "img"),
                n.setAttribute("aria-label", `Image from ${e.title}`),
                n.setAttribute("data-preload", null),
                e.backgroundDesktop && n.setAttribute("data-desktop", e.backgroundDesktop.url),
                e.backgroundMobile && n.setAttribute("data-mobile", e.backgroundMobile.url);
            let a = document.createElement("div");
            a.className = "section-inner feature";
            let i = document.createElement("div");
            if (i.className = "left" == e.alignContent ? "inner-left-bottom" : "inner-right-bottom",
                a.appendChild(i),
                a.appendChild(getHomepageScrollMeElement()),
                e.subtitle) {
                let t = document.createElement("p");
                t.className = "animate",
                    t.setAttribute("style", "text-transform: uppercase"),
                    t.innerHTML = e.subtitle,
                    i.appendChild(t)
            }
            if (e.title) {
                let t = document.createElement("h1");
                t.className = "animate shadowed",
                    t.setAttribute("style", "text-transform: uppercase"),
                    t.innerHTML = e.title,
                    i.appendChild(t)
            }
            let l = document.createElement("a");
            l.className = "btn animate",
                l.setAttribute("tabindex", "0"),
                l.setAttribute("href", e.link),
                l.setAttribute("aria-label", `${e.callToAction} ${e.title}`),
                l.setAttribute("role", "button"),
                e.newTab && l.setAttribute("target", "_"),
                l.innerHTML = `\n      <div class="hover"></div>\n      <span class="text">${e.callToAction}</span>\n    `,
                i.appendChild(l),
                t.appendChild(n),
                t.appendChild(a),
                document.getElementById("tiles").appendChild(t)
        })
}
function addHomepageScripts() {
    let e = document.createElement("script");
    e.setAttribute("type", "text/javascript"),
        e.setAttribute("src", "static/core-min.js"),
        document.getElementById("home").appendChild(e)
}
function getHomepageScrollMeElement() {
    let e = document.createElement("div");
    return e.className = "scrollme",
        e.innerHTML = '\n    <svg width="30px" height="20px" aria-label="more content below">\n      <path stroke="#ffffff" stroke-width="2px" d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "/>\n    </svg>\n  ',
        e
}
"loading" != document.readyState ? LoadHomepageTiles() : document.addEventListener("DOMContentLoaded", LoadHomepageTiles);
