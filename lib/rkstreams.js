
function Stream() {
    var fns = [];
    
    this.post = function (data) {
        setImmediate(function () { process(data); });
    };
    
    this.process = function (fn) {
        fns.push(fn);
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

