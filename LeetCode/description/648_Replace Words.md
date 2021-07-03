# 648. Replace Words
출처: https://leetcode.com/problems/replace-words/

## 문제

In English, we have a concept called  **root**, which can be followed by some other word to form another longer word - let's call this word  **successor**. For example, when the  **root**  `"an"`  is followed by the  **successor** word `"other"`, we can form a new word  `"another"`.

Given a  `dictionary`  consisting of many  **roots**  and a  `sentence` consisting of words separated by spaces, replace all the  **successors**  in the sentence with the  **root**  forming it. If a  **successor**  can be replaced by more than one  **root**, replace it with the  **root**  that has **the shortest length**.

Return  _the  `sentence`_  after the replacement.

영어에서, 일부 단어가 다른 긴 단어(**successor**라 부르자)를 이끄는 형태의 **root**라 불리는 개념이 존재한다. 예를 들어 **root** `"an"` 다음에 **successor** 단어 `"other"`가 올때, 새로운 단어 `"another"`가 된다.

다양한 **root**들로 구성된 `사전`과 스페이스로 구분되어진 단어로 구성된 `문장`이 주어지면, 문장 장의 모든 **successor**를 **root** 형태로 대체하라. 만약 **successor**가 한개 이상의 **root**와 대체 될수 있다면, **가장 짧은 길이**의 **root**와 대체하라.

대체 후 _문장_ 을 반환하라. 

## 예제
```
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
```
```
Input: dictionary = ["a", "aa", "aaa", "aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"
Output: "a a a a a a a a bbb baba a"
```

## 접근 방법

`"another"`의 root를 찾기 위해서 `a`, `an`, `ano`, `anot`, `anoth`, `anothe`, `another`이 사전에 등록되어 있는지 찾아야한다. 만약 `an`이 사전에 있다면 `an`보다 긴 요소의 후보군은 사전에 있는지 찾지 않아도 된다.

이를 위해 문자열 탐색에 효과적인 트라이(Trie) 구조를 사용하여 사전의 단어를 저장하는 방법을 사용하였다. 
```
Trie Node {
	links = Array(26).fill(0);
	isEnd; // True or False;
}
```
트라이의 노드가 위와 같은 모습을 하고 있을 때, `links`는 트라이 노드를 원소로 갖는 리스트이다. `links`의 인덱스(혹은 키)는 알파벳이 된다. `isEnd`는 현재 노드가 단어의 끝 노드인지를 알려주는 변수이다. 

이제 트라이에 `an`이 저장되어 있고, `another`의 root를 찾는다고 해보자. 트라이가 처음 가르키고 있는 트라이 노드의 `links`에 `a`가 저장되어 있는지 확인하고, 저장되어 있다면 `isEnd`를 추가로 확인하여 `a`로 끝나는 단어가 존재하는지 체크한다. 이 경우 `isEnd`가 `false`라고 하자. `a`로 끝나는 단어가 없기 때문에 `a`가 가르키고 있는 트라이 노드로 이동하고, 이 노드에 `n`이 저장되어 있는지 확인한다. `n`이 저장되어 있을 것이고 이때의 `isEnd`가 `true`일 것이다. 그렇다면 `an`이 사전에 있다는 뜻이 되어 이를 반환하면 된다.

이와 같은 형식으로 문장의 모든 단어를 서치한다. 만약 트라이에 찾고자 하는 알파벳이 저장되어 있지 않거나 단어의 끝에 도달하였는데도 트라이에서 `isEnd`가 `true`인 순간이 없었다면 단어 그대로를 출력한다.

## Code

<pre>
<code>
var replaceWords = function(dictionary, sentence) {
    const trie = new Trie();
    dictionary.forEach(word => {
        trie.insert(word);
    });
    
    const words = sentence.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = trie.find_prefix(words[i]);
    }
    return words.join(' ');
};

class TrieNode {
    constructor() {
        this.links = new Map();
        this.word = '';
    }
    
    containsKey(char) {
        return this.links.has(char);
    }
    
    get(char) {
        return this.links.get(char); 
    }
    
    put(char, node) {
        this.links.set(char, node);
    }
    
    setEnd(word) {
        this.word = word;
    }
    
    isEnd() {
        return this.word;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.containsKey(word[i])) {
                node.put(word[i], new TrieNode());
            }
            node = node.get(word[i]);
        }
        node.setEnd(word);
    }
    
    find_prefix(word){
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.containsKey(word[i])) break;
            
            node = node.get(word[i]);
            if (node.isEnd()) {
                return node.isEnd();
            }
        }
        return word;
    }
    
    getWord() {
        return this.word;
    }
}
</code>
</pre>
