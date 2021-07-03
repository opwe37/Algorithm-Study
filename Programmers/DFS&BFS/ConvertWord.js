function solution(begin, target, words) {
    var answer = 0;

    if (words.includes(target) == false) return 0;
    
    var dif = differWords(begin, words);
    var que = [];
    var bfsCount = 0;
    for (let i = 0; i < dif.length; i++) {
      if (dif[i] == 1) { que.push(words[i]); bfsCount++;}
      else { continue; }
    }

    while (que.length != 0) {
      var tar = que.shift();
      bfsCount--;
      if (bfsCount == 0) { answer++; }
      words.splice(words.indexOf(tar), 1);
      if (tar == target) { if (bfsCount != 0) {answer++;} break; }

      dif = differWords(tar, words);
      for (let i = 0; i < dif.length; i++) {
        if (dif[i] == 1) { que.push(words[i]); }
        else { continue; }
      }
      if (bfsCount == 0) { bfsCount = que.length; }
    }
    if (tar != target) return 0;
    
    return answer;
}

function differWords(begin, words) {
    var result = [];
    for (let word of words) {
        let dif = 0;
        for (let po = 0; po < begin.length; po++) {
            if (begin[po] == word[po]) {continue;}
            dif++;
        }
        result.push(dif);
    }
    return result;
}
