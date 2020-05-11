function solution(words, queries) {
    var answer = [];

    var chk_wordLength = [];
    var prefixTrie = [];
    var suffixTrie = [];
    for (var i = 0; i < words.length; i++) {
        var chk_exsit = chk_wordLength.includes(words[i].length);
        var target_preTrie, target_sufTrie;
        if (chk_exsit == false) {
            target_preTrie = new Trie(words[i].length);
            target_sufTrie = new Trie(words[i].length);
            chk_wordLength.push(words[i].length);
            prefixTrie.push(target_preTrie);
            suffixTrie.push(target_sufTrie);
        } else {
            var index = chk_wordLength.indexOf(words[i].length);
            target_preTrie = prefixTrie[index];
            target_sufTrie = suffixTrie[index];
        }
        target_preTrie.insert(words[i]);

        var transTmp = "";
        for (var j = words[i].length; j > 0; j--) {
            transTmp += words[i][j-1];
        }
        target_sufTrie.insert(transTmp);
    }

    for (var i = 0; i < queries.length; i++) {
        var chk_exist = chk_wordLength.includes(queries[i].length);
        if (chk_exist == false) {
            answer.push(0);
            continue;
        }
        
        var index = chk_wordLength.indexOf(queries[i].length);
        if (queries[i][0] != '?')  {
            var prefix = prefixTrie[index];
            answer.push(prefix.find(queries[i]));
        } else {
            var transQuery = "";
            for (var j = queries[i].length; j > 0; j--) {
                transQuery += queries[i][j-1];
            }
            var suffix = suffixTrie[index];
            answer.push(suffix.find(transQuery));
        }
    }
    
    return answer;
}

var Trie = class {
    constructor(b = 0, a = '') {
        this.node = a;
        this.child = [];
        this.length = b;
        this.count = 0;
    }

    insert(word) {
        var targetNode = this;
        targetNode.count++;
        for (var i = 0; i < this.length; i++) {
            var search = targetNode.child.find(function (e){
                if (e.node == word[i]) return e;
            });

            if (search == undefined) {
                var tmp = new Trie(0, word[i]);
                targetNode.child.push(tmp);
                targetNode = tmp;
            } else {
                targetNode = search;
            }
            targetNode.count++;
        }
    }

    find(query) {
        var targetNode = this;
        for (var i = 0; i < this.length; i++) {
            if (query[i] == '?') return targetNode.count;

            var search = (targetNode.child).find(function (e){
                if (e.node == query[i]) return e;
            });
            if (search == undefined) return 0;
            targetNode = search;
        }
        return 1;
    }
}
