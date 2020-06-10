//get Monday to sunday day number (monday is 0)
Date.prototype.getMoSuDay = function() {
    var currentDay = this.getDay();
    if (currentDay === 0) {
        return 6;
    }
    return currentDay - 1;
};
//get first and last day of the week, starting on monday
Date.prototype.getWeek = function() {
    var currentStamp = this.getTime();
    var currentDayIndex = this.getMoSuDay();

    var dayLengthStamp = 24 * 60 * 60 * 1000;
    var firstDayStamp = currentStamp - currentDayIndex * dayLengthStamp;
    var lastDayStamp = currentStamp + (6 - currentDayIndex) * dayLengthStamp;
    var lastWorkStamp = lastDayStamp - 2 * dayLengthStamp;

    var firstDayDate = new Date(firstDayStamp).getAbsoluteDate();
    //TODO: add week number to return
    return {
        id: firstDayDate.toISOString(),
        first: firstDayDate,
        last: new Date(lastDayStamp).getAbsoluteDate(),
        lastWork: new Date(lastWorkStamp).getAbsoluteDate()
    };
};
Date.prototype.getRightMonth = function() {
    return String("00" + (this.getMonth() + 1)).slice(-2);
};
Date.prototype.getRightDate = function() {
    return String("00" + this.getDate()).slice(-2);
};
//get day timestamp without hours, seconds, etc
Date.prototype.getAbsoluteDate = function() {
    var stamp = this.getTime();
    stamp -= this.getHours() * 60 * 60 * 1000;
    stamp -= this.getMinutes() * 60 * 1000;
    stamp -= this.getSeconds() * 1000;
    stamp -= this.getMilliseconds();
    return new Date(stamp);
};
Date.prototype.toSimpleISOString = function() {
    return `${this.getFullYear()}-${this.getRightMonth()}-${this.getRightDate()}`;
};