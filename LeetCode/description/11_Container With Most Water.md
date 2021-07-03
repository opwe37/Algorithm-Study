# 11. Container With Most Water
출처: https://leetcode.com/problems/container-with-most-water/

## 문제

Given  `n`  non-negative integers  `a1, a2, ..., an`  , where each represents a point at coordinate  `(i, ai)`.  `n`  vertical lines are drawn such that the two endpoints of the line  `i`  is at  `(i, ai)`  and  `(i, 0)`. Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

`n`개의 양의 정수 `a1, a2, ..., an`가 주어지면,  각각은 좌표 `(i, ai)`를 나타낸다. `n`개의 수직 선들은 두개의 점(`(i, ai)`와 `(i, 0)`)을 잇는 선으로 그려진다. x축과 함께 컨테이너를 형성여 가장 많은 물을 담을 수 있는 두개의 선을 찾아라.

**Notice** that you may not slant the container.
컨테이너는 기울일 수 없습니다.

## 예제
![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

## 접근 방법

임의의 두 인덱스 `i`와 `j`를 선택하였다고 가정하면, 이 때의 컨테이너의 크기는 `height[i]`와 `height[j]` 중 작은 요소에 의해 결정된다.
- container's area = (j - i) * min(height[i], height[j]), (j > i)

이 점을 이용하여 i = 0, j = height.length-1에서 시작하여 i 또는 j를 이동하며 컨테이너의 넓이를 측정한다. i와 j의 이동은 다음의 규칙을 따른다.
- height[i] 와 height[j] 중 더 짧은 길이의 인덱스를 선택
- i가 선택된다면, i = i + 1
- j가 선택된다면, j = j - 1

이 규칙 또한 두 선 중 짧은 길이에 의해 컨테이너의 넓이가 결정된다는 사실을 이용한 것이다. i 또는 j의 이동은 x축의 길이가 짧아지는 것을 의미하는데, 이 때 이동된 곳의 height값이 이전보다 크다면 컨테이너의 넓이는 커진다.

## Code

<pre>
<code>
var maxArea = function(height) {
    let left = 0,
        right = height.length -1;
    let result = 0;
    
    while (left != right) {
        let area = 0;
        if (height[left] > height[right]) {
            area = height[right]*(right-left);
            right--;
        } else {
            area = height[left]*(right-left);
            left++;
        }
        result = Math.max(result, area);
    }
    
    return result;
};
</code>
</pre>
