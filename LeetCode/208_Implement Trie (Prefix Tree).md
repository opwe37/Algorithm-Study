# 208. Implement Trie (Prefix Tree)
출처 : https://leetcode.com/problems/implement-trie-prefix-tree/

## 문제

Implement a trie with `insert`, `search`, and `startsWith` methods.
(`insert`, `search` 그리고 `startsWith`함수가 있는 Trie를 구현하라.)

## 예제

- Example
	```
	Trie trie = new Trie();

	trie.insert("apple");
	trie.search("apple");   // returns true
	trie.search("app");     // returns false
	trie.startsWith("app"); // returns true
	trie.insert("app");   
	trie.search("app");     // returns true
	```
	
## 접근 방법

Trie는 단어를 쪼개어 알파벳 하나하나를 노드로 하는 트리 구조를 말함
- Tire 구조로 단어를 저장하게 되면 단어 자동완성 기능과 같은 기능을 효율적으로 구현가능

`App` 이라는 단어가 Trie 구조로 표현되면 다음과 같음
```
 root
      \ a
        A
          \ p
           AP
	         \ p
	         APP
```
여기에 `April` 을 추가로 저장하다고 하면 다음과 같다.
```
 root
      \ a
        A
          \ p
           AP
	    r /  \ p
	    APR  APP
      i /
      APRI
    l /
   APRIL
```
- 단어의 끝을 쉽게 알아보기 위하여 노드에 단어의 끝인지 아닌지를 표시하도록 함
- 위의 트리를 root로부터 탐색을 하면 `app`, `april`이라는 단어가 저장되어 있음을 알 수 있음

## Code
<pre>
<code>
var Trie = function() {
    this.root = new TrieNode();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    var node = this.root;
    for (let i = 0; i < word.length; i++) {
        let currentChar = word[i];
        if (!node.containsKey(currentChar)) {
            node.put(currentChar, new TrieNode());
        }
        node = node.get(currentChar);
    }
    node.setEnd();
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.searchPrefix = function (word) {
    var node = this.root;
    for (let i = 0; i < word.length; i++) {
        let curLetter = word[i];
        if (node.containsKey(curLetter)) {
            node = node.get(curLetter);
        } else {
            return null;
        }
    }
    return node;
}
Trie.prototype.search = function(word) {
    var node = this.searchPrefix(word);
    return (node != null && node.isEnd());
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    var node = this.searchPrefix(prefix);
    return node != null;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

var TrieNode = function() {
    this.links = Array(26).fill(null);
    this.end = false;
}

TrieNode.prototype.containsKey = function(ch) {
    return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] != null;
}
TrieNode.prototype.get = function(ch) {
    return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
}
TrieNode.prototype.put = function(ch, node) {
    this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = node;
}
TrieNode.prototype.setEnd = function() {
    this.end = true;
}
TrieNode.prototype.isEnd = function() {
    return this.end;
}
</code>
</pre>
