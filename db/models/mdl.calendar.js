/*
 * event for team
 */

var util = require('../../util'),
    Model = require('./mdl.prototype.js');

var Calendar = exports = module.exports = function (data) {
    var s = this;
    util.obj.deepCopy(s.defaultValue, s);
    util.obj.deepCopy(data, s);
};

(function (Prototype) {
    Calendar.prototype = new Prototype();
    util.obj.copy(Prototype, Calendar);
})(Model);

Calendar.prototype.defaultValue = {
    /* name of team */
    team_name:null,
    /* team events */
    events:[],
    /* team holidays */
    holidays:{}
};

Calendar.findByTeamName = function (team_name, callback) {
    var s = this;
    return s.findOneByCondition({
        team_name:team_name
    }, callback);
};


Calendar.Event = function (data) {
    var s = this;
    util.obj.deepCopy(Calendar.Event.defaultValue, s);
    util.obj.deepCopy(data, s);
    s.date = util.date.truncateHours(new Date(data.date)).toJSON();
};
Calendar.Event.defaultValue = {
    /* date of event */
    date:null,
    /* time of event */
    time:null,
    /* title of event */
    title:null,
    /* detail of event */
    detail:null
};

Calendar.prototype.isHoliday = function(date){
    var json = util.date.truncateHours(new Date(date)).toJSON();
    var s = this;
    return !!s.holidays[json];
};

Calendar.prototype.addHoliday = function(date){
    var json = util.date.truncateHours(new Date(date)).toJSON();
    var s = this;
    s.holidays[json] = true;
    return s;
};

Calendar.prototype.removeHoliday = function(date){
    var json = util.date.truncateHours(new Date(date)).toJSON();
    var s = this;
    delete s.holidays[json];
    return s;
};

Calendar.prototype.addEvent = function(event, callback){
    var s = this;
    s.events.push(event);
    s.update(callback);
};

Calendar.prototype.updateEvents = function(events, callback){
    var s = this;
    s.events = events;
    s.update(callback);
}