const urls = [
    "https://w.wallhaven.cc/full/x1/wallhaven-x1wroo.jpg",
    "https://w.wallhaven.cc/full/zm/wallhaven-zmm7mw.png",
    "https://w.wallhaven.cc/full/96/wallhaven-96w8e8.png"
]

$(function () {
    $('.background').css("background-image", "url(" + urls[Math.floor(Math.random() * urls.length)] + ")")
    //var item = items[Math.floor(Math.random() * items.length)];

    $('.linkpanel').on("click", function() {
        closeLinkPanels();
        toggleLinkPanel($(this));
    })

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

    switch(key) {
        case "-f":
            return "https://www.facebook.com"
            break;
        case "-m":
            return "https://mail.google.com/mail/u/0/"
            break;
        case "-g":
            return "https://www.google.co.uk/?q=" + arg
            break;
        case "-a":
            return "https://www.amazon.co.uk/"
            break;
        default:
            return "";
    }
};