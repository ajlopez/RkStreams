
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

exports['post three messages to stream'] = function (test) {
    test.async();
    
    var counter = 0;
    
    var stream = rks.stream();
    
    stream.process(function (data) {
        counter++;
        
        test.ok(data);
        test.equal(data, counter);
        
        if (data === 3)
            test.done();
    });
    
    stream.post(1);
    stream.post(2);
    stream.post(3);
};