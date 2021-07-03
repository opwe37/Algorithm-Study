function solution(jobs) {
    var answer = 0;
    
    jobs.sort((a, b) => a[0] - b[0]);
    var numOfJob = jobs.length;

    var time;
    var queue = [];
    while(jobs.length != 0) {
      if (queue.length == 0) {
        let tmp = jobs.filter(val => val[0]==jobs[0][0]);
        for (let i = 0; i < tmp.length; i++)
          queue.push(jobs.shift());
        time = queue[0][0];
      }
      
      while(queue.length != 0) {
        queue.sort((a, b) => a[1] - b[1]);
        
        let job = queue.shift();
        answer += ((time - job[0]) + job[1]);
        time += job[1];
        let tmp_jobs = jobs.slice();
        for (let j = 0; j < tmp_jobs.length; j++) {
          if (jobs.length == 0 || jobs[0][0] > time) break;
          queue.push(jobs.shift());
        }
      }
    }

    answer = Math.floor(answer / numOfJob);
    
    return answer;
}
