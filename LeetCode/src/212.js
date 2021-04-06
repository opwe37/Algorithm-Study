/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    let answer = [];
    
    let max_length = 0;
    const trie = new Trie();
    for (let word of words) {
        trie.insert(word);
        max_length = Math.max(max_length, word.length);
    }
    
    var searchBoard = function(board, pre, pos, trie, limit) {
        if (!trie.containKey(board[pos[0]][pos[1]]) || limit == 0) {
            return null;
        }
        
        let node = trie.get(board[pos[0]][pos[1]]);
        if (node != null && node.isEnd()) {
            answer.push(node.word);
        }
        
        let tmp = board[pos[0]][pos[1]];
        board[pos[0]][pos[1]] = '-';
        
        const possible_paths = [[pos[0]-1, pos[1]], [pos[0], pos[1]+1], [pos[0]+1, pos[1]], [pos[0], pos[1]-1]]
        for (let i of possible_paths) {
            if (i[0] < 0 || i[0] >= board.length || i[1] < 0 || i[1] >= board[0].length) {
                continue;
            }
            if (pre != null && pre[0] == i[0] && pre[1] == i[1]) {
                continue;
            }
            searchBoard(board, pos, i, node, limit-1);
        }
        
        board[pos[0]][pos[1]] = tmp;
    };

    const m = board.length,
          n = board[0].length;
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            searchBoard(board, null, [row, col], trie.root, max_length);
        }
    }
    
    return Array.from(new Set(answer));
};

var trieNode = function() {
    this.links = new Map();
    this.end = false;
    this.word = '';
}

trieNode.prototype.containKey = function(ch) {
    return this.links.has(ch)
}

trieNode.prototype.get = function(ch) {
    return this.links.get(ch)
}

trieNode.prototype.put = function(ch, node) {
    this.links.set(ch, node)
}

trieNode.prototype.setEnd = function() {
    this.end = true
}

trieNode.prototype.isEnd = function() {
    return this.end
}

var Trie = function() {
    this.root = new trieNode();
}

Trie.prototype.insert = function(word) {
    let node = this.root;
    for (let ch of word) {
        if (!node.containKey(ch)) {
             node.put(ch, new trieNode())
        }
        node = node.get(ch);
    }
    node.setEnd();
    node.word = word;
}
