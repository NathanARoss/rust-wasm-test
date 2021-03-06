const consoleOutput = document.getElementById("console-output");

function print(value) {
    if (consoleOutput.childNodes.length == 0 || consoleOutput.lastChild.nodeValue.length > 512) {
        const textNode = document.createTextNode(value);
        consoleOutput.appendChild(textNode);
    } else {
        consoleOutput.lastChild.nodeValue += value;
    }
}

const UTF8Decoder = new TextDecoder('utf-8');

let memory;
const imports = {
    env: {
        puts(ptr, size) {
            const ubytes = new Uint8Array(memory.buffer).subarray(ptr, ptr + size);
            const message = UTF8Decoder.decode(ubytes);
            print(message);
        },
        putc(char) {
            const message = String.fromCharCode(char);
            print(message);
        },
        putnum(value) {
            const message = String(value);
            print(message);
        }
    }
};

fetch('out.wasm')
.then(response => response.arrayBuffer())
.then(bytes => WebAssembly.instantiate(bytes, imports))
.then(results => {
    const exports = results.instance.exports;
    memory = exports.memory;
    exports.start();

    exports.remember(100);
    exports.remember(200);
    exports.remember(-1);
});