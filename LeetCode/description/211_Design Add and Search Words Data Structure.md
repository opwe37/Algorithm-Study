# 211. Design Add and Search Words Data Structure
출처: https://leetcode.com/problems/design-add-and-search-words-data-structure/

## 문제

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the  `WordDictionary`  class:

-   `WordDictionary()` Initializes the object.
-   `void addWord(word)`  Adds  `word`  to the data structure, it can be matched later.
-   `bool search(word)` Returns  `true`  if there is any string in the data structure that matches  `word` or  `false`  otherwise.  `word`  may contain dots  `'.'`  where dots can be matched with any letter.

새로운 단어를 추가하고, 이전에 추가된 문자열과 일치하는 단어가 있는지 확인하는 일을 지원하는 데이터 구조를 설계하라.

`WordDictionary` 클래스를 구현하라:
- `WordDictionary`는 오브젝트로 초기화된다.
- `void addWord(word)`는 `word`를 데이터 구조에 추가한다.
- `bool search(word)`는 데이터 구조에 일치하는 단어가 있다면 `true`를 반한하고 아니라면 `false`를 반환한다. `word`는 점 `.`를 포함할 수 도 있는데 점은 어떤 문자와도 일치할 수 있다. 

## 예제
```
Input :
	["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
	[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output : [null,null,null,null,false,true,true,true]

Explanation : 
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
```

## 접근 방법

이 문제의 핵심은 문자열을 저장하고 탐색하는데 특화되어 있는 구조인 Trie를 2개 사용하는 것이다. 

Trie구조를 한 개만 사용할때의 문제는 단어를 탐색할 때 점 `.` 문자가 문자열의 맨 앞에 있는 경우이다. 점 `.` 문자는 문제에서 어떤 문자든 될 수 있다고 하였다. 이로 인해 모든 문자를 탐색해야하고 자칫 시간초과의 문제에 직면할 수 있다. 이를 위해서 Trie를 2개 사용하는 것이다. 
1. 1st Trie : 단어를 올바른 순서로 저장
2. 2nd Trie : 단어의 문자 순서를 뒤집어 저장

예를 들어,`word = "apple"`이라고 한다면 첫 번째 Trie에는 `"apple"`의 형태로, 두 번째 Trie에는 `"elppa"`의 형태로 저장한다. 

만약 `"...le"`를 탐색한다고 하면, 첫 번째 Trie에서는 타겟 문자의 첫 세개의 문자가 `.`이기 때문에 탐색해야 하는 범위가 매우 넓지만, 두 번째 Trie에서는 `"el..."`이 타겟이되어 `"el"`을 먼저 탐색한 후, `.`을 위한 탐색을 수행하기 때문에 첫 번째 Trie보다 탐색 범위가 줄어들게 된다.

## Code

<pre>
<code>
var WordDictionary = function() {
    this.prefixTrie = new Trie();
    this.suffixTrie = new Trie();
};

WordDictionary.prototype.addWord = function(word) {
    const wordReverse = word.split('').reverse();
    
    try {
        this.prefixTrie.insert(word.split(''));
        this.suffixTrie.insert(wordReverse);
    } catch(error) {
        console.log(error);
        return false;
    }
    return true;
};

WordDictionary.prototype.search = function(word) {
    const trie = word[0] == '.' ? this.suffixTrie : this.prefixTrie;
    const target = word[0] == '.' ? word.split('').reverse().join('') : word;
    
    return trie.search(target);
};
</code>
</pre>

Trie 구현
<pre>
<code>
class Trie {
    constructor() {
        this.root = Array(26).fill(null);
        this.end = false;
    }
    
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (node[convertChartoIndex(word[i])] == null) {
                node[convertChartoIndex(word[i])] = new Trie();
            }
            if (i+1 == word.length) node[convertChartoIndex(word[i])].end = true;
            
            node = node[convertChartoIndex(word[i])].root;
        }
    }
    
    search(word) {
        if (!word) return this.end;
        
        if (word[0] != '.') {
            if (this.root[convertChartoIndex(word[0])] == null) {
                return false;
            }
            return (this.root[convertChartoIndex(word[0])]).search(word.slice(1));
        } else {
            for (let i = 0; i < 26; i++) {
                if (this.root[i] == null) { continue; }
                let tmpResult = this.root[i].search(word.slice(1));
                if (tmpResult) {
                    return tmpResult;
                }
            }
            return false;
        }
    }
}

function convertChartoIndex(c) {
    return Number(c.charCodeAt(0) - 'a'.charCodeAt(0));
}
</code>
</pre>
