var HelloCtrl = require('../src/hello.js');

describe('Hello World controller', function() {

    var ctrl;
    beforeEach(function(){
        ctrl = new HelloCtrl();
    });

    it('should have the "World" name by default', function() {
        expect(ctrl.name).to.equal('World');
    });

    it('should allow clearing a name', function() {
        ctrl.clear();
        expect(ctrl.name).to.equal('');
    });
});