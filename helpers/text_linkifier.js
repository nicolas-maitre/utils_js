//requires strings library

Utils.appendLinkifiedText = function(container, text) {
    const URL_REGEX = /(\b(((https?|ftp|file):\/\/)|www.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi; // found on stackoverflow https://stackoverflow.com/a/8943487/11548808
    const SECURE_SCHEME = "https://";
    const UNSECURE_SCHEME = "http://";
    const DEFAULT_SCHEME = UNSECURE_SCHEME;
    //text data
    var parsedText = Utils.parseTextWithRegex(text, URL_REGEX);

    for (var indText = 0; indText < parsedText.texts.length; indText++) {
        var textNode = document.createTextNode(parsedText.texts[indText]);
        container.appendChild(textNode);
        if (typeof parsedText.matches[indText] !== "undefined") {
            var linkText = parsedText.matches[indText];
            if (
                linkText.substring(0, SECURE_SCHEME.length) != SECURE_SCHEME &&
                linkText.substring(0, UNSECURE_SCHEME.length) != UNSECURE_SCHEME
            ) {
                //test http str
                linkText = DEFAULT_SCHEME + linkText;
            }
            var linkElem = container.addElement("a", {
                href: linkText,
                target: "_blank",
                rel: "noopener noreferrer", //prevent resources conflict + leaks
                _text: parsedText.matches[indText]
            });
        }
    }
};