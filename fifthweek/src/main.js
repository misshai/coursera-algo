let Graph = require('./graph3.js');
let map = require('./data3.js');
let graph = new Graph(map);
let result = [];
let desiredPaths = [7,37,59,82,99,115,133,165,188,197];
desiredPaths.map((item)=>result.push(graph.findShortestPath(1,item)[0]));
console.log(result);
