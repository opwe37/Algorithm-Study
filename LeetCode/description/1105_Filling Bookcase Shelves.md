# 1105. Filling Bookcase Shelves

출처 : https://leetcode.com/problems/filling-bookcase-shelves/

## 문제

We have a sequence of  `books`: the  `i`-th book has thickness  `books[i][0]`  and height  `books[i][1]`.
(두께가 `books[i][0]`이고 높이가 `books[i][1]`인 책들이 있다.)

We want to place these books  **in order** onto bookcase shelves that have total width  `shelf_width`.
(이 책들을 가로 길이 `shelf_width`인 책장에 순서대로 진열해야 한다.)

We choose some of the books to place on this shelf (such that the sum of their thickness is  `<= shelf_width`), then build another level of shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.
(선반 위에 놓일 책을 선정하고, 책장에 새로운 선반을 설치한다. 이로 인해서 책장의 높이는 놓인 책 중 가장 높은 책에 의존하여 커진다. 더 이상의 놓여질 책이 없을 때까지 이 과정을 반복한다.)

Note again that at each step of the above process,  the order of the books we place is the same order as the given sequence of books. For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.
(위의 과정의 각 단계에 대해 다시 말하자면, 놓일 책들의 순서는 주어진 일련의 책의 순서와 동일하다. 예를들어, 5개의 책이 순서화된 리스트로 주어질 때, 1번과 2번 책은 첫 선반에, 3번 책은 두번째 선반에, 그리고 4번과 5번 책은 마지막 선반에 놓여질 수 있다.)

Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.
(모든 책을 선반에 놓았을 때, 얻을 수 있는 책장의 높이 중 최소의 값을 반환하시오.)

## 예제

- Example 1
![](https://assets.leetcode.com/uploads/2019/06/24/shelves.png)
	```
	Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelf_width = 4
	Output: 6
	Explanation: The sum of the heights of the 3 shelves are 1 + 3 + 2 = 6.
	Notice that book number 2 does not have to be on the first shelf.
	```
	
## 접근방법

DP를 이용한 접근
- `dp[i]`는 1 ~ i 의 책을 선반위에 올렸을 때의 최소 높이를 의미
- dp[i]가 갖을 수 있는 최대 높이는 i번째 책을 위해 새로운 선반을 설치하여 책을 올려놓는 경우
	- `dp[i]'s Max = dp[i-1] + books[i][1]`
- 위의 상태에서 i번째 책과 같은 선반에 놓일 수 있는 책을 순차적으로 늘려가면서 책장의 전체 높이를 체크
	- 만약 i, i-1 번째 책이 같은 선반에 놓일 경우 
		- `Total Height = books[i][1] + books[i-1][1] + dp[i-2]` 
		- 단, `books[i][0] + books[i-1][0] <= shelf_width`인 경우에
	
	- i, i-1, i-2 번째 책이 같은 선반에 놓일 경우
		- `Total Height = books[i][1] + books[i-1][1] + books[i-2][1] + dp[i-3]`
		- 단,` books[i][0] + books[i-1][0] + books[i-2][0]<= shelf_width`인 경우에
		
		
- 위와 같은 방식으로 i번째 책과 같은 선반위에 놓일 수 있는 책과 그 때의 책장 높이를 확인할 수 있고, 이를 이전에 알고 있는 최소 높이(즉, dp[i])와 비교하여 최소값을 갱신해 갈 수 있음
 
## Code
<pre>
<code>
/**
 * @param {number[][]} books
 * @param {number} shelf_width
 * @return {number}
 */
var minHeightShelves = function(books, shelf_width) {
    const n = books.length;
    var dp = Array(n+1).fill(0);
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        let width = books[i-1][0];
        let height = books[i-1][1];
        dp[i] = dp[i-1] + height;
        for (let j = i-1; j > 0; j--) {
            width += books[j-1][0];
            if (width > shelf_width) break;
            height = Math.max(height, books[j-1][1]);
            dp[i] = Math.min(dp[i], height + dp[j-1]);
        }
    }
    return dp[n];
};
</code>
</pre>
