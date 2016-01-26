
function Stream() {
    var fns = [];
    
    this.post = function (data) {
        setImmediate(function () { process(data); });
    };
    
    this.process = function (obj, fn) {
        if (!fn) {
            fn = obj;
            obj = null;
        }
        
        if (obj)
            fns.push(function (data) { if (data === obj) fn(data); });
        else
            fns.push(fn);
            
        return this;
    };

    this.map = function (fn) {
        var stream = new Stream();
        
        this.process(function (data) {
            stream.post(fn(data));
        });
        
        return stream;
    };

    this.merge = function (stream) {
        var newstream = new Stream();
        
        this.process(function (data) {
            newstream.post(data);
        });

        stream.process(function (data) {
            newstream.post(data);
        });
        
        return newstream;
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

