"use strict";
function fillGraph(){
    let graph  = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    graph.addVertex(4);
    graph.addVertex(5);
    graph.addVertex(6);
    graph.addVertex(7);
    graph.addVertex(8);
    graph.addVertex(9);

    graph.addEdge(7,1);
    graph.addEdge(9,7);
    graph.addEdge(4,7);
    graph.addEdge(1,4);
    graph.addEdge(9,3);
    graph.addEdge(3,6);
    graph.addEdge(6,9);
    graph.addEdge(8,6);
    graph.addEdge(2,8);
    graph.addEdge(5,2);
    graph.addEdge(8,5);

    return graph;
}

function calcMagicNumbers(graph){
    let magicVertices = [];
    let visited = [];
    let counter = 1;
    for(let i = graph.size()-1; i>=0;i--){
        let  value = graph.getVertexByIndex(i);
        if (!visited[value]){
            graph.DFSStack(value, visited, (k)=>{
                let allVisited = true;
                let arr = graph.getRelationsPerVertex(k);
                for(var i = 0; i < arr.length; i++) {
                    if(!visited[arr[i]]) {
                        allVisited = false;
                    }
                }
                if(allVisited && !magicVertices[k]){
                    magicVertices[k] = counter;
                    counter++;
                }
            })
        }
    }
    return magicVertices;
}

function combineGraphWithMagicNumbers(graph, magicNumbers){
    let combinedGraph = new Graph();
    for(let i = 0;i<graph.size(); i++){
        combinedGraph.addVertex(graph.getVertexByIndex(i));
    }
    for(let m in magicNumbers){
        let arr = graph.getRelationsPerVertex(m);
        for(let n=0; n < arr.length;n++){
            combinedGraph.addEdge(magicNumbers[m], magicNumbers[arr[n]]);
        }
    }
    return combinedGraph;
}

function graphGroups(graph){
    let groupsByLeader = [];
    let visited = [];
    for(let i = graph.size()-1; i>=0;i--) {
        let value = graph.getVertexByIndex(i);
        if (!visited[value]) {
            graph.DFSStack(value, visited, (k)=> {
                let allVisited = true;
                let arr = graph.getRelationsPerVertex(k);
                for (var i = 0; i < arr.length; i++) {
                    if (!visited[arr[i]]) {
                        allVisited = false;
                    }
                }
                if (allVisited ) {
                    if(!groupsByLeader[value]){
                        groupsByLeader[value] = [];
                    }
                    groupsByLeader[value].push(k);
                }
            })
        }
    }
    return groupsByLeader;
}

function calsAmountOfGroups(groups){
    let result = [];
    result = groups.map((item)=>{return item.length});
    result.sort();
    return result;
}

function algo(){
    let graph = fillGraph();
    let reversedGraph = graph.reverse();
    let magicNumbers = calcMagicNumbers(reversedGraph);
    let combinedGraphWithMagicNumbers = combineGraphWithMagicNumbers(graph, magicNumbers);
    let groups = graphGroups(combinedGraphWithMagicNumbers);
    let amountOfGroupsLength = calsAmountOfGroups(groups);
    console.log(amountOfGroupsLength);
}

function run(){
    algo();

}

run();
