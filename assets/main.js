let key = "";

function search(query) {
    if (query === null || query === undefined || query.length === 0)
        return Promise.resolve([]);

    let params = new URLSearchParams();
    params.set("key", key);
    params.set("q", query);
    params.set("limit", "25");

    let url = new URL("https://g.tenor.com/v1/search");
    url.search = params.toString();

    return new Promise(function (resolve, reject) {
        httpGetAsync(url.toString(), function (results) {
            let response_objects = JSON.parse(results);

            return resolve({
                gifs: response_objects.results,
                done: response_objects.next === "0",
            });
        });
    });
}

let queryElem = document.getElementById("query");
let searchElem = document.getElementById("search");
let containerElem = document.getElementById("container");

searchElem.onclick = function () {
    while (containerElem.children.length)
        containerElem.removeChild(containerElem.firstChild);

    search(queryElem.value)
        .then(function (result) {
            result.gifs.map(gif => {
                return gif.media[0].nanomp4.url;
            }).forEach(url => {
                containerElem.appendChild(createVideoElem(url));
            });

            function createVideoElem(src) {
                let video = document.createElement("video");
                video.src = src;
                video.onmouseenter = function () {
                    video.play();
                };
                video.onmouseleave = function () {
                    video.pause();
                    video.currentTime = 0;
                };

                return video;
            }
        });
};

// url Async requesting function
function httpGetAsync(theUrl, callback) {
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}
