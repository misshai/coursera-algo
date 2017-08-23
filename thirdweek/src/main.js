
let graph = new Graph();
data.map((val,index,arr)=>{
    graph.addVertex(index+1);
    val.map((val, i)=>{if (i!=0) graph.addEdge(index+1, val);});
});


function minCuts(){

    while(graph.size()>2){

        let randX = Math.floor(Math.random()*graph.size());
        randX = graph.getVertexByIndex(randX);
        let randY =Math.floor(Math.random()*graph.relationsPerVertex(randX));
        randY = graph.getRelationsPerVertex(randX)[randY];
        //remove relation
        graph.removeEdge(randX, randY);
        graph.removeEdge(randY, randX);
        //go by string and replace relation
        let arr = graph.getRelationsPerVertex(randY);
        for(let i of arr){
            if(randX!=i)
            graph.addEdge(randX, i);
            graph.removeEdge(i, randY);
            if(randX!=i)
            graph.addEdge(i, randX  );
        }
        //remove string
        graph.removeVertex(randY);
    }
    return (graph.relationsPerVertex(graph.getVertexByIndex(0)) == graph.relationsPerVertex(graph.getVertexByIndex(1)))?graph.relationsPerVertex(graph.getVertexByIndex(1)):0;

}

console.log(minCuts())
