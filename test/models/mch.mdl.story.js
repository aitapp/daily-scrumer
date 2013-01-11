var should = require('should'),
    db = require('../../db'),
    Story = db.models['Story'];


describe('mdl.story', function(){
    require('../check_env')();
    before(function(done){
        new Story({
            sprint_id:'1234',
            redmine_id:'4321'
        }).save(function(){
                done();
            });
    });
    before(function(done){
        new Story({
            sprint_id:'1234'
        }).save(function(){
                done();
            });
    });
    after(function(done){
        Story.prototype.connector.remove(function(){
            done();
        });
    });

    it('findBySprintId', function(done){
        Story.findBySprintId('1234', function(data){
            data.should.be.lengthOf(2);
            done();
        });
    });

    it('findByRedmineId', function(done){
        Story.findByRedmineId('4321', function(data){
            data.should.have.property('redmine_id', '4321');
            done();
        });
    });

});