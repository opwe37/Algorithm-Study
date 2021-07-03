function solution(relation) {
  var answer = 0;
  answer = candidateKey(relation);
  return answer;
}

function candidateKey(relation) {
  var col_idx = [];
  for (let i = 0; i < relation[0].length; i++) {col_idx[i] = i;}

  var result = [];
  var numOfCombination = 1;
  while (numOfCombination <= relation[0].length) {
    let combination = printCombinations(col_idx, numOfCombination);
    
    for (let val of combination) {
      if (result.some(function (e) {
        let intersection = val.filter(x => e.includes(x));
        if (JSON.stringify(intersection) == JSON.stringify(e)) return true;
        else return false;
      })) continue;

      let tmp_d = [];
      for (let rel of relation) {
        let tmp = [];
        for (let i = 0; i < val.length; i++) {
          tmp.push(rel[val[i]]);
        }
        tmp_d.push(tmp);
      }

      if (searchDuplicate(tmp_d)) continue;
      else result.push(val.slice());
    }
    numOfCombination++;
  }

  return result.length;
}

function printCombinations(array, k){
    var result = [];
    var combinations = [];
    
    function run(level, start){
        for(var i=start; i < array.length - k + level + 1; i++){
            combinations[level] = array[i];
            
            if(level < k - 1){
                run(level + 1, i + 1);
            } else {
                result.push(combinations.slice());
            }
        }
    }
    run(0, 0);

    return result;
}

function searchDuplicate(arr){
    var sorted_arr = arr.slice().sort();
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (JSON.stringify(sorted_arr[i + 1]) == JSON.stringify(sorted_arr[i])) {
            return true;
        }
    }
    return false;
}
