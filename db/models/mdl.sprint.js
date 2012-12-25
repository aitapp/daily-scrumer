/*
 * スプリント情報
 */

var util = require('../../util'),
    Model = require('./mdl.prototype.js');

var Sprint = exports = module.exports = function(data){
    var s = this;
    util.obj.deepCopy(s.defaultValue, s);
    util.obj.deepCopy(data, s);
};

Sprint.prototype.defaultValue = {

    /* team名*/
    team_name:null,

    /* スプリント名 */
    name:null,

    /* スプリント番号 */
    number:null
};

(function(Prototype){
    Sprint.prototype = new Prototype();
    for(var name in Prototype){
        if (!Prototype.hasOwnProperty(name)) continue;
        Sprint[name] = Prototype[name];
    }
})(Model);

/* チーム名での検索 */
Sprint.findByTeamName = function(team_name, callback){
    var s = this;
    return s.findByCondition({
        team_name:team_name
    }, callback);
};

/* チーム名検索で、最新のものを取得する */
Sprint.findLatestByTeam = function(team_name, callback){
    var s = this;
    return s.findByTeamName(team_name, function(data){
        callback.call(s, data && data.length && data[0] || null);
    }).sort({number:-1}).limit(1);

};