import build_graph from "./graph.js"


const roads = [
	"Alice's House-Bob's House",
	"Alice's House-Cabin",
	"Alice's House-Post Office",
	"Bob's House-Town Hall",
	"Daria's House-Ernie's House",
	"Daria's House-Town Hall",
	"Ernie's House-Grete's House",
	"Grete's House-Farm",
	"Grete's House-Shop",
	"Marketplace-Farm",
	"Marketplace-Post Office",
	"Marketplace-Shop",
	"Marketplace-Town Hall",
	"Shop-Town Hall",
]

export const road_graph = build_graph(roads.map(road => road.split("-")))


function build_dijkstrajs_graph(road_graph) {
	let graph = Object.create(null)

	for (let node of Object.keys(road_graph)) {
		let edges = graph[node] = {}

		for (let destination of road_graph[node])
			edges[destination] = 1
	}

	return graph
}

export const dijkstrajs_graph = build_dijkstrajs_graph(road_graph)
