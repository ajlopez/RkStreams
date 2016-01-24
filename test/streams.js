
var rks = require('..');

exports['create and use stream'] = function (test) {
    test.async();
    
    var stream = rks.stream();
    
    stream.process(function (data) {
        test.ok(data);
        test.equal(data, 1);
        test.done();
    });
    
    stream.post(1);
};