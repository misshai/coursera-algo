const HashMap = require('hashmap');
const fs = require('fs');

function readData(map, arr) {
    let result = new HashMap();
    fs.readFileSync('./input.txt').toString().split('\r\n').forEach(function (line) {
        if (map.get(+line) != 1) {
            map.set(+line, 1);
            arr.push(+line);
        }
    });
    return result;
}

function algo() {
    const MIN_VALUE = -1e4;
    const MAX_VALUE = 1e4;
    const initialHashMap = new HashMap();
    const arr = [];
    readData(initialHashMap, arr);
    let result = 0;
    const mapSize = initialHashMap.size;
    console.log(mapSize);
    for (let i = MIN_VALUE; i <= MAX_VALUE; i++) {
        for (let j = 0; j < mapSize; j++) {

            let y = i - arr[j];
            if (y != arr[j] && initialHashMap.has(y)) {
                result++;
                console.log(i, y, arr[j]);
                break;
            }
        }
    }
    console.log(result);

}
algo();

