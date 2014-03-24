var helloTpl = require('../src/hello.hsp');

describe('Hello World', function() {

    it('should say Hello to the World', function() {
        var n = helloTpl({name: 'World'});
        expect(n.node.firstChild.textContent).to.equal('Hello, World!');
    });

});