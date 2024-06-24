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

function build_graph(edges) {
	let graph = Object.create(null)

	function add_edge(from, to) {
		graph[from] == null ? graph[from] = [to] : graph[from].push(to)
	}

	for (let [from, to] of edges.map((r) => r.split("-"))) { // If a => b, ten b => a (symmetric relation)
		add_edge(from, to)
		add_edge(to, from)
	}
	return graph
}

const road_graph = build_graph(roads)


globalThis.road_graph = road_graph
