
var rks = require('..');

exports['generator using function'] = function (test) {
    test.async();
    
    var generator = rks.generator(function () { return 1; }, { times: 3, frequency: 100 });
    var stream = rks.stream();
    
    var counter = 0;
    
    stream.process(function (data) {
        counter++;
        
        test.equal(data, 1);
        test.ok(counter <= 3);
        
        if (counter === 3)
            test.done();
    });
    
    generator.post(stream);
    generator.start();
};

exports['constant generator'] = function (test) {
    test.async();
    
    var generator = rks.generator(1, { times: 3, frequency: 100 });
    var stream = rks.stream();
    
    var counter = 0;
    
    stream.process(function (data) {
        counter++;
        
        test.equal(data, 1);
        test.ok(counter <= 3);
        
        if (counter === 3)
            test.done();
    });
    
    generator.post(stream);
    generator.start();
};
