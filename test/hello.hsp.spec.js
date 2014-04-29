//var fireEvent = require('hsp/utils/eventgenerator').fireEvent;
var helloTpl = require('../src/hello.hsp');

describe('Hello World', function() {

    it('should say Hello to the World', function() {
        var n = helloTpl();
        expect(n.node.firstChild.textContent).to.equal('Hello, World!');
    });

    it('should allow clearing a name to greet', function() {
        var n = helloTpl();
        //fireEvent('click', n.node.lastChild.click);
        //expect(n.node.firstChild.textContent).to.equal('Hello, !');
    });
});