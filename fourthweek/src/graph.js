function Graph() {
    this.vertices = [];
    this.edges = [];
    this.numberOfEdges = 0;
}

Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
};

Graph.prototype.getVertexByIndex = function(index) {
    return this.vertices[index];
};
Graph.prototype.removeVertex = function(vertex) {
    var index = this.vertices.indexOf(vertex);
    if(~index) {
        this.vertices.splice(index, 1);
    }
    while(this.edges[vertex].length) {
        var adjacentVertex = this.edges[vertex].pop();
        this.removeEdge(adjacentVertex, vertex);
    }
};
Graph.prototype.addEdge = function (vertex1, vertex2){
    this.edges[vertex1].push(vertex2);
    //this.edges[vertex2].push(vertex1);
    this.numberOfEdges++;
};
Graph.prototype.removeEdge = function(vertex1, vertex2) {
    var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
    var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
    if(~index1) {
        this.edges[vertex1].splice(index1, 1);
        this.numberOfEdges--;
    }
    //if(~index2) {
    //    this.edges[vertex2].splice(index2, 1);
    //}
};
Graph.prototype.size = function() {
    return this.vertices.length;
};
Graph.prototype.relations = function() {
    return this.numberOfEdges;
};

Graph.prototype.relationsPerVertex = function(vertex) {
    return this.edges[vertex].length;
};

Graph.prototype.getRelationsPerVertex = function(vertex) {
    return this.edges[vertex];
};

Graph.prototype.print = function() {
    console.log(this.vertices.map(function(vertex) {
        return (vertex + ' -> ' + this.edges[vertex].join(', ')).trim();
    }, this).join(' | '));
    console.log('-------------');
};


Graph.prototype.reverse = function() {
   let reversedGraph = new Graph();
    for(let i in this.vertices){
        reversedGraph.addVertex(this.vertices[i]);
    }
    for(let i = 0; i<this.vertices.length;i++){
        for(let j =0; j<this.edges[this.vertices[i]].length;j++){
            reversedGraph.addEdge(this.edges[this.vertices[i]][j],this.vertices[i]);
        }
    }

    return reversedGraph;
};

Graph.prototype.traverseDFS = function(vertex, visited, fn) {
    if(!~this.vertices.indexOf(vertex)) {
        return console.log('Vertex not found');
    }
   // var visited = [];
    this._traverseDFS(vertex, visited, fn);
};
Graph.prototype._traverseDFS = function(vertex, visited, fn) {

    if(this.edges[vertex] !== undefined) {
        visited[vertex] = true;
        fn(vertex);
    }
    for(var i = 0; i < this.edges[vertex].length; i++) {
        if(!visited[this.edges[vertex][i]]) {
            this._traverseDFS(this.edges[vertex][i], visited, fn);
        }
    }
};

Graph.prototype.DFSStack = function (vertex, visited, fn){
    "use strict";

    let stack = [];
    let node;
    if(this.edges[vertex] !== undefined) {
        stack.push(vertex);
        visited[vertex] = true;
        fn(vertex);
    }

    while (stack.length) {
        node = stack.pop();
        let allVisited = true;

        for(var i = 0; i < this.edges[node].length; i++) {
            if(!visited[this.edges[node][i]]) {
                allVisited = false;
            }
        }
        if(!allVisited){
            stack.push(node);
        }
        fn(node);
        for (var i = this.edges[node].length-1; i >=0; i--) {
            if (!visited[this.edges[node][i]]) {
                stack.push(this.edges[node][i]);
                visited[this.edges[node][i]] = true;
            }
        }


    }

};
