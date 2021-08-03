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

    return fetch(url)
        .then(res => res.json())
        .then(results => {
            return {
                gifs: results.results,
                done: results.next === "0",
            };
        })
        .catch(error => {
            console.error(error);

            return error;
        });
}
let queryElem = document.getElementById("query");
let searchElem = document.getElementById("search");
let containerElem = document.getElementById("container");

searchElem.onclick = () => {
    while (containerElem.children.length)
        containerElem.removeChild(containerElem.firstChild);

    search(queryElem.value)
        .then(({ gifs, done }) => {
            gifs.map(gif => {
                return gif.media[0].nanomp4.url;
            }).forEach(url => {
                containerElem.appendChild(createVideoElem(url));
            });

            function createVideoElem(src) {
                let video = document.createElement("video");
                video.src = src;
                video.onmouseenter = () => {
                    video.play();
                };
                video.onmouseleave = () => {
                    video.pause();
                    video.currentTime = 0;
                };

                return video;
            }
        });
};
