export default function build_graph(edges) {
	let graph = Object.create(null)

	function add_edge(from, to) {
		graph[from] == null ? graph[from] = [to] : graph[from].push(to)
	}

	for (let [from, to] of edges) {
		add_edge(from, to)
		add_edge(to, from)
	}
	return graph
}
