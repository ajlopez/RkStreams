
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

exports['selective processes using constants'] = function (test) {
    test.async();
    
    var counter = 0;
    
    var stream = rks.stream();
    
    stream.process(1, function (data) {
        counter++;
        
        test.ok(data);
        test.equal(data, counter);
        test.equal(data, 1);
    });
    
    stream.process(2, function (data) {
        counter++;
        
        test.ok(data);
        test.equal(data, counter);
        test.equal(data, 2);
        test.done();
    });
    
    stream.post(1);
    stream.post(2);
};

exports['post three messages to streams and merge'] = function (test) {
    test.async();
    
    var counter = 0;
    
    var stream1 = rks.stream();
    var stream2 = rks.stream();
    
    stream1.merge(stream2)
        .process(function (data) {
        counter++;
        
        test.ok(data);
        test.equal(data, counter);
        
        if (data === 3)
            test.done();
    });
    
    stream1.post(1);
    stream2.post(2);
    stream1.post(3);
};

exports['chaining processes'] = function (test) {
    test.async();
    
    var counter = 0;
    
    var stream = rks.stream();
    
    stream.process(function (data) {
        counter++;
    }).process(function (data) {
        test.ok(data);
        test.equal(data, counter);
        
        if (data === 3)
            test.done();
    });
    
    stream.post(1);
    stream.post(2);
    stream.post(3);
};

exports['map stream'] = function (test) {
    test.async();
    
    var counter = 0;
    
    var stream = rks.stream();
    
    stream.map(function (x) { return x * 2; }).process(function (data) {
        counter++;
        
        test.ok(data);
        test.equal(data, counter * 2);
        
        if (data === 6)
            test.done();
    });
    
    stream.post(1);
    stream.post(2);
    stream.post(3);
};

exports['filter stream'] = function (test) {
    test.async();
    
    var stream = rks.stream();
    
    stream
        .filter(function (x) { return x % 2 === 0})
        .filter(function (x) { return x % 5 === 0})
        .process(function (data) {
            test.ok(data);
            test.equal(data, 10);
            test.done();
        });
    
    for (var k = 1; k <= 10; k++)
        stream.post(k);
};

