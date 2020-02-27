Element.prototype.addElement = function(type = "div", attributes = {}){
    var elem = document.createElement(type);
    this.appendChild(elem);
    for(var indAttr in attributes){
        elem.setAttribute(indAttr, attributes[indAttr]);
    }
    //special attributes (setters/other)
    if(attributes._innerText) elem.innerText = attributes._innerText;
    if(attributes._innerHTML) elem.innerHTML = attributes._innerHTML;
    return elem;
};

Element.prototype.removeChilds = function(elemQuerySelector = false){
	if(elemQuerySelector){
		var elemsToRemove = [...this.querySelectorAll(elemQuerySelector)]
	} else {
		var elemsToRemove = [...this.childNodes];
	}
	elemsToRemove.forEach((elem) => {
		elem.remove();
	});
};
Element.prototype.prependBefore = function(ref){
	ref.parentNode.insertBefore(this, ref);
}

Element.prototype.appendAfter = function(ref){
	ref.parentNode.insertBefore(this, ref.nextSibling);
}

HTMLCollection.prototype.forEach = Array.prototype.forEach;