Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

var minimumTeachings = function(n, languages, friendships) {
    const cant_communicate = new Set();
    for (let friendship of friendships) {
        const [friendA, friendB] = friendship;
        if (new Set(languages[friendA-1]).intersection(new Set(languages[friendB-1])).size != 0) {
            continue;
        }
        cant_communicate.add(friendA);
        cant_communicate.add(friendB);
    }
    
    if (!cant_communicate.size) return 0;
    
    const lang = new Map();
    let most_common_lang = {lang: 0, count: 0};
    cant_communicate.forEach(friend => {
        languages[friend-1].forEach(l => {
            if (lang.has(l)) {
               lang.set(l, lang.get(l)+1);
            } else {
               lang.set(l, 1);
            }
            most_common_lang = most_common_lang.count < lang.get(l) ? {lang: l, count: lang.get(l)} : most_common_lang;
        });
    });
    
    let result = 0;
    cant_communicate.forEach(friend => {
        if(!languages[friend-1].includes(most_common_lang.lang)) result++;
    });
    return result;
};
