String.prototype.capitalise = function(){
	return this[0].toUpperCase() + this.slice(1);
}
Utils.countWords = function(str) {
    return str.split(" ").filter(function(n) {
        return n != "";
    }).length;
};
//parses a text with a provided regex, returns texts and matches in arrays.
Utils.parseTextWithRegex = function(text, regex) {
    var matches = [];
    var textArray = [text];
    while (true) {
        //get url
        var matchRes = regex.exec(text);
        if (!matchRes) {
            //no (more) urls
            break;
        }
        var match = matchRes[0];
        //split on url
        var splitted = textArray[textArray.length - 1].split(match);
        //merge second part of splitted text, including urls.
        var splitAfter = splitted.slice(1, splitted.length);
        var nextString = splitAfter[0];
        for (var indSplit = 1; indSplit < splitAfter.length; indSplit++) {
            nextString += match;
            nextString += splitAfter[indSplit];
        }
        //push text and url to the respective arrays
        textArray[textArray.length - 1] = splitted[0];
        textArray.push(nextString);
        matches.push(match);
    }
    return {
        text: text,
        texts: textArray,
        matches: matches
    };
};