"use strict";
class MiniCalendar{
    constructor(parent, date = new Date()){
        this.date = date;
        this.elems = this.buildContainer(parent);
    }
    buildContainer(parent){
        var elems = {};
        elems.container = parent.addElement("div", {class:"miniCalendar"});
        //header
        elems.header = elems.container.addElement("div", {class:"header"});
        elems.backBtn = elems.header.addElement("button", {class:"backBtn", _text:"<"});
        elems.timeRangeDisplay = elems.header.addElement("button", {class:"timeRangeDisplay", _text:"..."});
        elems.nextBtn = elems.header.addElement("button", {class:"nextBtn", _text:">"});
        //body
        elems.body = elems.container.addElement("div", {class:"body"});
        elems.weeksContainer = elems.body.addElement("div", {class:"weeksContainer"});
        elems.monthsContainer = elems.body.addElement("div", {class:"monthsContainer scaledUp none"});
        elems.yearsContainer = elems.body.addElement("div", {class: "yearsContainer scaledUp none"});
        //date input
        elems.dateInputContainer = elems.container.addElement("div", {class:"dateInputContainer"});
        elems.dateInput = elems.dateInputContainer.addElement("input", {class:"dateInputContainer", type:"text", placeholder:"date string"});
        //evts
        document.body.addEventListener("click", this.hide);
        elems.container.addEventListener("click", (evt)=>{evt.stopPropagation();});
        elems.backBtn.addEventListener("click", this.lastRange);
        elems.nextBtn.addEventListener("click", this.nextRange);
        elems.timeRangeDisplay.addEventListener("click", this.rangeUp);

        return elems;
    }
    buildMonth(date){

    }
    buildYear(date){

    }
    buildDecade(date){

    }
    
    show(){

    }
    hide(){

    }
    lastRange(){

    }
    nextRange(){

    }
    rangeUp(){

    }

    setRange(){

    }
    setRangeLevel(){

    }
}