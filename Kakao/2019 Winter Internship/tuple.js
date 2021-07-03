function solution(s) {
    var answer = [];

    var input = s.replace(/},{/g, '/').replace(/{{|}}/g, ' ').trim();
    var element = input.split('/');
    
    var arr = [];
    element.forEach(function(e) {
      let numbers = e.split(',');
      let tmp = [];
      for (let i of numbers) {
        tmp.push(Number(i));
      }
      arr.push(tmp.slice());
    });

    arr.sort(function(a, b) {
      if (a.length > b.length) return 1;
      else return -1;
    });

    var map = new Map();
    arr.forEach(function(val) {
      val.forEach(function(e) {
        if (!map.has(e)) {
          map.set(e, e);
        }
      })
    });

    map.forEach(val => answer.push(val));

    return answer;  
}
