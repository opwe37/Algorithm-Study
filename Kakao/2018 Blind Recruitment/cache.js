function solution(cacheSize, cities) {
    var answer = 0;

    var time = 0;
    var cache = new Array();
    for (var i = 0; i < cities.length; i++) {
        var word = cities[i].toLowerCase();
        var flag = false;
        for (var j = 0; j < cache.length; j++) {
            if (cache.length == 0) break;
            if (cache[j] == word) {
                cache.splice(j, 1);
                cache.push(word);
                time = time + 1;
                flag = true;
                break;
            }
        }
        if (flag == false) {
            cache.push(word);
            if (cache.length > cacheSize) cache.splice(0, 1);
            time = time + 5;
        }
    }
    answer = time;

    return answer;
}
