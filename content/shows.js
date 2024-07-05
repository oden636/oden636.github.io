const ahtml = "<a href=\"{{Url}}\">{{Title}}</a>";

const getShowsJson = async () => {
    const response = await fetch("https://oden636.github.io/content/shows.json");
    const data = await response.json();

    await populateShowsJson(data);
};

const populateShowsJson = async (data) => {
    let container = document.getElementsByClassName("js-shows-list")[0];
    data.forEach((obj) => {
        if (obj.stillWatching) {
            container.append(ahtml.replace("{{Title}}", obj.title).replace("{{Url}}", obj.overviewURL));
        }
    });

    console.log("Shows watched: " + data.length);
};

getShowsJson()