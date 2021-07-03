function solution(tickets) {
    var answer = [];
    tickets.sort(function(a, b) {
      if (a[1] < b[1])
        return -1;
      if ( a[1] > b[1])
        return 1;
      return 0;
    })

    var visited = tickets.map(val => [val, false]);
    answer = dfs('ICN', visited, answer, tickets.length);
    return answer;
}

function dfs(startAirPort, visited, result, numOfRestTicket) {
    result.push(startAirPort);
    if (numOfRestTicket == 0) {return result.slice();}

    for (let i = 0; i < visited.length; i++) {
        if (visited[i][0][0] != startAirPort) continue;
        if (visited[i][1]) continue;
        
        let arriveAirPort = visited[i][0][1];
        visited[i][1] = true;
        let searchedPath = dfs(arriveAirPort, visited, result.slice(), numOfRestTicket-1);
        if (searchedPath != false) return searchedPath;
        visited[i][1] = false;
    }
    return false;
}
