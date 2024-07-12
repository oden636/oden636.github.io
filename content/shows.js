const ahtml = "<a href=\"{{Url}}\">{{Title}}</a>";

const getShowsJson = async () => {
    const response = await fetch("https://oden636.github.io/content/shows.json");
    const data = await response.json();

    await populateShowsJson(data);
};

const populateShowsJson = async (data) => {
    const container = document.getElementsByClassName("js-shows-list")[0];

    const tags = [];

    data.forEach((obj) => {
        if (obj.stillWatching) {
            tags.push(ahtml.replace("{{Title}}", obj.title).replace("{{Url}}", obj.overviewURL));
        }
    });

    container.innerHTML = tags.join('')
};

getShowsJson()