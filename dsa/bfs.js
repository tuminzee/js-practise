const bfs = (graph, start) => {
    const queue = [[start, 0]];
    const visited = new Set();
    visited.add(start);
    const distances = {};

    while (queue.length > 0) {
        const [node, distance] = queue.shift();
        distances[node] = distance;

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, distance + 1]);
            }
        }
    }

    return distances;
}
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
};

const rootNode = 'A';
const distances = bfs(graph, rootNode);

console.log(`Distances from root node ${rootNode} to all other nodes:`);
for (const [node, distance] of Object.entries(distances)) {
    console.log(`${node}: ${distance}`);
}