const Heap = require('heap');
const fs = require('fs');

function readData() {
    let result = [];
    fs.readFileSync('./input.txt').toString().split('\r\n').forEach(function (line) {
        result.push(+line);
    });
    return result;
}
function normalizeHeaps(heapMin, heapMax) {
    const sizeHeapMax = heapMax.size(),
        sizeHeapMin = heapMin.size();
    if (Math.abs(sizeHeapMax - sizeHeapMin) == 2) {
        if (sizeHeapMax > sizeHeapMin) {
            heapMin.push(heapMax.pop());
        } else {
            heapMax.push(heapMin.pop());
        }
    }
}
function calcCurrentResult(heapMin, heapMax){
    const sizeHeapMax = heapMax.size(),
        sizeHeapMin = heapMin.size();

    if (sizeHeapMax-sizeHeapMin == 0){
        return heapMax.peek();
    }else{
        return (sizeHeapMax>sizeHeapMin)?heapMax.peek():heapMin.peek();
    }
}

function algo() {
    let heapMin = new Heap(function (a, b) {
        return (a - b);
    });
    let heapMax = new Heap(function (a, b) {
        return -(a - b);
    });
    let initial = readData();
    let result = initial[0];
    if (initial[0] > initial[1]) {
        heapMin.push(initial[0]);
        heapMax.push(initial[1]);
        result+=initial[1];
    } else {
        heapMin.push(initial[1]);
        heapMax.push(initial[0]);
        result+=initial[0];
    }

    for (let k = 2; k < initial.length; k++) {
        let headHeapMax = heapMax.peek();
        (initial[k] <= headHeapMax) ? heapMax.push(initial[k]) : heapMin.push(initial[k]);
        normalizeHeaps(heapMin, heapMax);
        result+=calcCurrentResult(heapMin, heapMax);
    }
    console.log(result);
}
algo();

