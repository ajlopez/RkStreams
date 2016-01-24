
function Stream() {
    var fns = [];
    
    this.post = function (data) {
        setImmediate(function () { process(data); });
    };
    
    this.process = function (fn) {
        fns.push(fn);
    };

    this.map = function (fn) {
        var stream = new Stream();
        
        this.process(function (data) {
            stream.post(fn(data));
        });
        
        return stream;
    };

    this.filter = function (fn) {
        var stream = new Stream();
        
        this.process(function (data) {
            if (fn(data))
                stream.post(data);
        });
        
        return stream;
    };
    
    function process(data) {
        fns.forEach(function (fn) {
            fn(data);
        });
    };
}

function createStream() {
    return new Stream();
}

module.exports = {
    stream: createStream
};

