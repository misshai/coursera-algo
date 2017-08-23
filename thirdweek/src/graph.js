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
