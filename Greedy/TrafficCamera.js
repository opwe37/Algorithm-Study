function solution(routes) {
    var answer = 0;

    routes.sort((a, b) => a[0]-b[0]);

    var chkPoint;
    routes.forEach(function(val) {
      if (preEnd == undefined && routes.length != 0) {
        answer++;
        chkPoint = val[1]; 
        return true;
      }
      
      if (chkPoint >= val[0]) {
        if (chkPoint > val[1]) chkPoint = val[1];
        return true;
      }

      chkPoint = val[1];
      answer++;
    });

    return answer;
}
