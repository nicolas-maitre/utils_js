//_PROTOTYPES_METHODS_
Element.prototype.addElement = function (type = "div", attributes = {}) {
    var elem = document.createElement(type);
    this.appendChild(elem);
    for (var indAttr in attributes) {
        //special attributes (setters/other)
        if (attributes._text) { elem.textContent = attributes._text; continue; }
        if (attributes._html) { elem.innerHTML = attributes._html; continue; }
        elem.setAttribute(indAttr, attributes[indAttr]);
    }
    return elem;
};

Element.prototype.removeChilds = function (elemQuerySelector = false) {
    if (elemQuerySelector) {
        var elemsToRemove = [...this.querySelectorAll(elemQuerySelector)]
    } else {
        var elemsToRemove = [...this.childNodes];
    }
    elemsToRemove.forEach((elem) => {
        elem.remove();
    });
};

String.prototype.capitalise = function () {
    return this[0].toUpperCase() + this.slice(1);
}

Element.prototype.addElemBefore = function (ref) {
    ref.parentNode.insertBefore(this, ref);
}

Element.prototype.addElemAfter = function (ref) {
    ref.parentNode.insertBefore(this, ref.nextSibling);
}

HTMLCollection.prototype.forEach = Array.prototype.forEach;

//get Monday to sunday day number (monday is 0)
Date.prototype.getMoSuDay = function () {
    var currentDay = this.getDay();
    if (currentDay === 0) {
        return 6;
    }
    return currentDay - 1;
};
//get first and last day of the week, starting on monday
Date.prototype.getWeek = function () {
    var currentStamp = this.getTime();
    var currentDayIndex = this.getMoSuDay();

    var dayLengthStamp = 24 * 60 * 60 * 1000;
    var firstDayStamp = currentStamp - currentDayIndex * dayLengthStamp;
    var lastDayStamp = currentStamp + (6 - currentDayIndex) * dayLengthStamp;
    var lastWorkStamp = lastDayStamp - (2 * dayLengthStamp);

    var firstDayDate = (new Date(firstDayStamp)).getAbsoluteDate()
    //TODO: add week number to return
    return {
        id: firstDayDate.toISOString(),
        first: firstDayDate,
        last: (new Date(lastDayStamp)).getAbsoluteDate(),
        lastWork: (new Date(lastWorkStamp)).getAbsoluteDate()
    }
};
Date.prototype.getRightMonth = function () {
    return String("00" + (this.getMonth() + 1)).slice(-2);
};
Date.prototype.getRightDate = function () {
    return String("00" + (this.getDate())).slice(-2);
}
//get day timestamp without hours, seconds, etc
Date.prototype.getAbsoluteDate = function () {
    var stamp = this.getTime();
    stamp -= (this.getHours() * 60 * 60 * 1000);
    stamp -= (this.getMinutes() * 60 * 1000);
    stamp -= (this.getSeconds() * 1000);
    stamp -= this.getMilliseconds();
    return new Date(stamp);
};
Date.prototype.toSimpleISOString = function () {
    return `${this.getFullYear()}-${this.getRightMonth()}-${this.getRightDate()}`;
};

var Cookies = {};
Cookies.get = function (key = false) {
    var cookiesStr = document.cookie;
    var cookiesArray = cookiesStr.split(";");
    var cookies = {};
    cookiesArray.forEach((cookie) => {
        var cookieComponents = cookie.split("=");
        if (cookieComponents.length != 2) {
            return;
        }
        var cookey = decodeURIComponent(cookieComponents[0].trim());
        var value = decodeURIComponent(cookieComponents[1]);
        cookies[cookey] = value;
    });
    if (key) {
        return cookies[key];
    }
    return cookies;
}
Cookies.set = function (key, value, expiration = (1000 * 60 * 60 * 24 * 365)/*1 year*/, path = "/") {
    var expirationDate = new Date(Date.now() + expiration);
    var cookieStr = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    cookieStr += `; expires=${expirationDate.toUTCString()}`
    cookieStr += `; path=${path}`;
    document.cookie = cookieStr;
}
Cookies.delete = function (key) {
    Cookies.set(key, "deleted", -1);
}

function async_requestAnimationFrame() {
    return new Promise(function (res, rej) {
        requestAnimationFrame(res);
    });
}
function async_setTimeout(time) {
    return new Promise(function (res, rej) {
        setTimeout(res, time);
    });
}
//uuid generator stolen from https://stackoverflow.com/a/8809472 (then simplified a bit)
function generateUUID() { // Public Domain/MIT
    var d = Date.now();//Timestamp
    var d2 = performance.now() * 1000;//Time in microseconds since page-load
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d2 + (Math.random() * 16)) % 16 | 0;
        d2 = Math.floor(d2 / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
//_UTILS METHODS
var Utils = {};
Utils.getGlobalLoader = function () {
    if (!elements.globalLoader) {
        elements.globalLoader = {};
        elements.globalLoader.container = document.body.addElement("div", { class: "globalLoaderContainer none" });
        elements.globalLoader.loader = elements.globalLoader.container.addElement("div", { class: "globalLoaderImage" });

        elements.globalLoader.show = async function ({ withBackground = false } = {}) {
            await async_requestAnimationFrame();
            if (withBackground) {
                elements.globalLoader.container.classList.add("withBackground");
            } else {
                elements.globalLoader.container.classList.remove("withBackground");
            }
            await async_requestAnimationFrame();
            elements.globalLoader.container.classList.remove("none");
            await async_requestAnimationFrame()
            elements.globalLoader.container.style.opacity = 1;
        }
        elements.globalLoader.hide = async function () {
            await async_requestAnimationFrame();
            elements.globalLoader.container.style.opacity = 0;
            await async_setTimeout(200);
            await async_requestAnimationFrame();
            elements.globalLoader.container.classList.add("none");
        }
    }
    return elements.globalLoader;
};
Utils.infoBox = function (message, time = 5000) {
    var infoBox = document.body.addElement("div", { class: "infoMessageBox" });
    infoBox.innerText = message;
    requestAnimationFrame(async function () {
        infoBox.style.opacity = 1;
        if (time != Infinity) {
            await async_setTimeout(time)
            remove();
        }
    });
    async function remove() {
        await async_requestAnimationFrame();
        infoBox.style.opacity = 0;
        await async_setTimeout(0.5 * 1000);
        infoBox.remove();
    }
    return { elem: infoBox, remove };
};
Utils.decodeQuery = function (queryString) {
    if (!queryString) {
        return false;
    }
    var cleanQuery = (queryString.split("?")[1] || queryString); //cleans query if it contains a `?` char
    var queryStringArray = cleanQuery.split("&");
    var queryObject = {};
    for (var indQuery in queryStringArray) {
        var paramArray = queryStringArray[indQuery].split("=");
        if (paramArray[1]) {
            queryObject[paramArray[0]] = paramArray[1];
        } else {
            queryObject[paramArray[0]] = false;
        }
    }
    return queryObject;
};
Utils.encodeQuery = function (queryData) {
    var encodedStr = ""
    for (var indQuery in queryData) {
        encodedStr += encodeURIComponent(indQuery);
        encodedStr += "=";
        encodedStr += encodeURIComponent(queryData[indQuery]);
        encodedStr += "&"
    }
    return encodedStr.slice(0, -1);
}

Utils.setDynamicLinks = function (parent) {
    var linksList = parent.getElementsByTagName("a");
    for (var indLink = 0; indLink < linksList.length; indLink++) {
        Utils.setDynamicLink(linksList[indLink]);
    }
};
Utils.setDynamicLink = function (elem) {
    var href = elem.pathname;
    var hrefArray = href.split("/");
    var page = hrefArray[1];
    var query = Utils.decodeQuery(elem.search)
    var path = (hrefArray.slice(2) || false); //get path
    if (pagesConfig[page]) {//only adds event if the page target exists
        //add event
        elem.addEventListener("click", function (evt) {
            evt.preventDefault();
            //remove href
            elem.removeAttribute("href");
            //change page
            pagesManager.changePage(page, { query, path });
            //put href back on
            requestAnimationFrame(function (frameTime) {
                elem.setAttribute("href", href);
            });
        });
    }
};

//garbage
function $() {
    alert("nul! enlève ça de ton code!");
    throw new Error("oskur le jquery");
}