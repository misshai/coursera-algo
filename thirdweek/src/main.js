"use strict";
function createGraph() {
    let graph = new Graph();
    data.map((val, index, arr)=> {
        graph.addVertex(index + 1);
        val.map((val, i)=> {
            if (i != 0) graph.addEdge(index + 1, val);
        });
    });
    return graph;
}

function minCuts(graph) {

    while (graph.size() > 2) {
        let randX = Math.floor(Math.random() * graph.size());
        randX = graph.getVertexByIndex(randX);
        let randY = Math.floor(Math.random() * graph.relationsPerVertex(randX));
        randY = graph.getRelationsPerVertex(randX)[randY];
        //remove relation
        graph.removeEdge(randX, randY);
        graph.removeEdge(randY, randX);
        //go by string and replace relation
        let arr = graph.getRelationsPerVertex(randY);
        for (let i of arr) {
            if (randX != i) {
                graph.addEdge(randX, i);
                graph.addEdge(i, randX);
            }
            graph.removeEdge(i, randY);
        }
        //remove string
        graph.removeVertex(randY);
    }
    return (graph.relationsPerVertex(graph.getVertexByIndex(0)) == graph.relationsPerVertex(graph.getVertexByIndex(1)))
        ? graph.relationsPerVertex(graph.getVertexByIndex(1)) : 0;
}

function run(){
    let minResult = 1e100;
    for (let i = 0;i<1e2;i++){
        let result = minCuts(createGraph());
        minResult = Math.min(minResult, result);

    }
    return minResult;
}

console.log(run())
