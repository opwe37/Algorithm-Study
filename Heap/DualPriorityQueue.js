function solution1(operations) {
    var answer = [0, 0];
    
    var queue = []
      , max
      , min;
    
    while (operations.length != 0) {
        console.log(queue, [max, min]);
        let command = operations.shift();
        command = command.split(' ');
        switch(command[0]) {
            case "I":
                let num = parseInt(command[1]);
                if (queue.length == 0) {
                    queue.push(num);
                    max = num;
                    min = num;
                    break;
                }
                queue.push(num);
                if (num > max) {
                    max = num;
                } else if (num < min){
                    min = num;
                }
                break;
            case "D":
                if (queue.length == 0) break;
                if (command[1] == "1") {
                    queue.splice(queue.indexOf(max), 1);
                    if (min != max) max = Math.max.apply(null, queue);
                    else {min = 0; max = 0;}
                } else {
                    queue.splice(queue.indexOf(min), 1);
                    if (min != max) min = Math.min.apply(null, queue);
                    else {min = 0; max = 0;}
                }
                break;
        }
    }
    if (queue.length != 0) answer = [max, min];
    return answer;
}

function solution2(operations) {
    var answer = [0, 0];
    
    var queue = [];
    operations.forEach(val => {
      if (val[0] == "I") {
        queue.push(Number(val.split(' ')[1]));
      } else {
        if (queue.length == 0) return;
        let deleteNum = val[2] == '-' ? Math.min(...queue) : Math.max(...queue);
        queue.splice(queue.indexOf(deleteNum), 1);
      }
    })
    answer = queue.length == 0 ? [0, 0] : [Math.max(...queue), Math.min(...queue)]
    return answer;
}
