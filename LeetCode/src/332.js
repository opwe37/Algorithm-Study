var findItinerary = function(tickets) {
    let answer = "";
    
    tickets.sort((a, b) => a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0);
    
    const n = tickets.length;
    const airline = buildAdjList(tickets);
    
    dfs(airline, "JFK", "", n);
    
    return answer.trim().split(' ');
    
    function dfs(airline, departure, path, remainTicket){
        if(remainTicket == 0) {
            answer = path + " " + departure;
            return;
        }

        const possibleArrival = airline.get(departure);
        if (!possibleArrival) { return; }

        for(let i = 0; i < possibleArrival.arrival.length; i++) {
            if (answer) { break; }
            if (possibleArrival.used[i]) {
                continue;
            }

            possibleArrival.used[i] = true;
            dfs(airline, possibleArrival.arrival[i], path + " " + departure, remainTicket-1);
            possibleArrival.used[i] = false;
        }

        return;
    }
};

var buildAdjList = function(edges) {
  const adjList = new Map();

  for (let [u, v] of edges) {
	if (!adjList.has(u)) {
    	adjList.set(u, { arrival: [], used: [] });
    }
    adjList.get(u).arrival.push(v);
  }
  
  for (let [key, value] of adjList) {
  	value.used = new Array(value.arrival.length).fill(false);
  }
  
  return adjList;
}
