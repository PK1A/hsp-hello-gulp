var HelloCtrl = function(){
    this.name = 'World';

    this.clear = function() {
        this.name = '';
    }
}

module.exports = HelloCtrl;