const consoleOutput = document.getElementById("console-output");

function print(value) {
    if (consoleOutput.childNodes.length == 0 || consoleOutput.lastChild.nodeValue.length > 512) {
        const textNode = document.createTextNode(value);
        consoleOutput.appendChild(textNode);
    } else {
        consoleOutput.lastChild.nodeValue += value;
    }
}

function decodeString(ubytes, offset, size) {
    const data = ubytes.subarray(offset, offset + size);
    return String.fromCharCode.apply(String, data);
}

let memory;
const imports = {
    env: {
        print(address, size) {
            const ubytes = new Uint8Array(memory.buffer);
            const message = decodeString(ubytes, address, size);
            print(message);
        }
    }
};

fetch('wasm.wasm')
.then(response => response.arrayBuffer())
.then(bytes => WebAssembly.instantiate(bytes, imports))
.then(results => {
    const instance = results.instance;
    memory = instance.exports.memory;
    instance.exports.start();
});