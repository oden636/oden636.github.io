const urls = [
    "https://w.wallhaven.cc/full/x1/wallhaven-x1wroo.jpg",
    "https://w.wallhaven.cc/full/zm/wallhaven-zmm7mw.png",
    "https://w.wallhaven.cc/full/96/wallhaven-96w8e8.png",
    "https://w.wallhaven.cc/full/2e/wallhaven-2em38y.jpg",
    "https://w.wallhaven.cc/full/ym/wallhaven-ymoo2x.jpg",
    "https://w.wallhaven.cc/full/96/wallhaven-96w8e8.png",
    "https://w.wallhaven.cc/full/lm/wallhaven-lmlj32.jpg",
    "https://w.wallhaven.cc/full/rd/wallhaven-rd3xvm.jpg",
    "https://w.wallhaven.cc/full/ox/wallhaven-oxkjgm.jpg",
    "https://w.wallhaven.cc/full/j5/wallhaven-j5mz95.png"
];

const liHtml = "<li><a href=\"{{Url}}\">{{Title}}</a></li>";

$(function () {
    $('.background').css("background-image", "url(" + urls[Math.floor(Math.random() * urls.length)] + ")");
    //var item = items[Math.floor(Math.random() * items.length)];

    $('.linkpanel').on("click", function() {
        closeLinkPanels();
        toggleLinkPanel($(this));
    });

    getShowsJson();

    $('.terminal-form').on("submit", function(e) {
        e.preventDefault();

        let cmd = getAction($(this).find("input").val());
        if (cmd === "")
            return;

        window.location.href = cmd;
    });

    $('.terminal-block').find("input").focus();
});

const closeLinkPanels = function() {
    $('.linkpanel').each(function(i) {
        closeLinkPanel($('.linkpanel')[i]);
    });
};

const closeLinkPanel = function (obj) {
    $(obj).find(".hidden").hide();
    $(obj).switchClass("hovery", "hoverbox", 200, "easeInOutQuad");
};

const openLinkPanel = function (obj) {
    $(obj).switchClass("hoverbox", "hovery", 200, "easeInOutQuad", () => {
        $(obj).find(".hidden").show();
    });
};

const toggleLinkPanel = function(obj) {
    if(!$(obj).hasClass("hovery")) {
        openLinkPanel(obj);
    }
    else
    {
        closeLinkPanel(obj);
    }
};

const getAction = function(cmd) {
    let key = cmd.split(' ')[0]; 
    let arg = cmd.split(' ')[1];
    
    let query = "" 

    if(cmd.split(' ')[0] != "-g") 
    {
        query = cmd
    } else 
    {
        cmd.split(' ').forEach(function(e) {
            if(e != cmd.split(' ')[0]) {
                query += e + " "
            }
        });
    }


    switch(key) {
        case "-f":
            return "https://www.facebook.com"
            break;
        case "-m":
            return "https://mail.google.com/mail/u/0/"
            break;
            break;
        case "-a":
            return "https://www.amazon.co.uk/"
            break;
        case "-g":
        default:
            return "https://www.google.co.uk/search?q=" + query
    }
};

const getShowsJson = function() {
    let promise = new Promise((resolve, reject) => {
        $.getJSON("https://oden636.github.io/content/shows.json", (data) => {
            if (data != null) {
                resolve(data)
            } else {
                reject(Error("Shits fucked fam"))
            }
            promise.then((result) => {
                populateShowsJson(result)
            }, (e) => {
                console.log(e);
            });
        });
    });

};

const populateShowsJson = function(data) {
    let container = $(".js-shows-list");
    data.forEach((obj) => {
        if (obj.stillWatching) {
            container.append(liHtml.replace("{{Title}}", obj.title).replace("{{Url}}", obj.overviewURL));
        }
    });

    console.log("Shows watched: " + data.length);
};

