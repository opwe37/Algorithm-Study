# 388. Longest Absolute File Path

출처: https://leetcode.com/problems/longest-absolute-file-path/

## 문제
Suppose we have a file system that stores both files and directories. An example of one system is represented in the following picture:</br>
(파일과 디렉토리를 저장하는 파일시스템이 있다. 다음 그림은 시스템의 예제이다)

![](https://assets.leetcode.com/uploads/2020/08/28/mdir.jpg)

Here, we have  `dir`  as the only directory in the root.  `dir`  contains two subdirectories,  `subdir1`  and  `subdir2`.  `subdir1`  contains a file  `file1.ext`  and subdirectory  `subsubdir1`.  `subdir2`  contains a subdirectory  `subsubdir2`, which contains a file  `file2.ext`.</br>
(여기, 루트에 오직 한 디렉토리 `dir`이 있다. `dir`은 두 하위 디렉토리인 `subdir1`과 `subdir2`를 가지고 있다. `subdir1`은 파일 `file1.ext`와 하위 디렉토리 `subsubdir1`을 가지고 있다. `subdir2`는 파일 `file2.ext`를 가지고 있는 하위 디렉토리 `subsubdir2`를 가지고 있다.)

In text form, it looks like this (with ⟶ representing the tab character):</br>
(텍스트 형태로 보면, 다음과 같다(⟶는 텝을 표현))
dir
⟶ subdir1
⟶ ⟶ file1.ext
⟶ ⟶ subsubdir1
⟶ subdir2
⟶ ⟶ subsubdir2
⟶ ⟶ ⟶ file2.ext

If we were to write this representation in code, it will look like this:  `"dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"`. Note that the  `'\n'`  and  `'\t'`  are the new-line and tab characters.

Every file and directory has a unique  **absolute path**  in the file system, which is the order of directories that must be opened to reach the file/directory itself, all concatenated by  `'/'s`. Using the above example, the  **absolute path**  to  `file2.ext`  is  `"dir/subdir2/subsubdir2/file2.ext"`. Each directory name consists of letters, digits, and/or spaces. Each file name is of the form  `name.extension`, where  `name`  and  `extension`  consist of letters, digits, and/or spaces.

Given a string  `input`  representing the file system in the explained format, return  _the length of the  **longest absolute path**  to a  **file**  in the abstracted file system_. If there is no file in the system, return  `0`.

만약 이것을 코드에서 표현한다면 다음과 같다: `"dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"`
`'\n'`과 `'\t'`는 줄바꿈과 텝 기호이다.

모든 파일과 디렉토리는 파일 시스템에서 유일한 **절대 경로**를 가지며, 절대 경로란 파일/디렉토리 자체에 도달하기 위해 반드시 열어야하는 디렉토리의 순서이며 모두 `'/'s`로 연결된다. 위 예제를 사용해서, `file2.ext`의 **절대 경로**는 `"dir/subdir2/subsubdir2/file2.ext"`이다.
각 디렉토리 이름은 문자, 숫자 그리고/또는 공백으로 구성되어있다. 각 파일 이름은 `name.extension`의 형태이며, `name`과 `extension`은 문자, 숫자 그리고/또는 공백으로 구성되어있다.

설명한 형태로 파일 시스템의 문자열 `input`이 주어지면, _파일 시스템에서 **파일**의 **가장 긴 절대 경로**의 길이_를 반환하라. 만약 시스템안에 파일이 없다면, `0`을 반환하라.

## 예제
![](https://assets.leetcode.com/uploads/2020/08/28/dir2.jpg)
```
Input: input = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"
Output: 32
Explanation: We have two files:
"dir/subdir1/file1.ext" of length 21
"dir/subdir2/subsubdir2/file2.ext" of length 32.
We return 32 since it is the longest absolute path to a file.
```

## 접근 방법

주어진 input의 형태를 보면, DFS 방식으로 탐색되었고 디렉토리/파일 이름 앞 `'\t'`의 개수가 깊이를 의미함을 알 수 있다.

이 점을 이용하여 마치 트리를 DFS하듯이 input을 탐색할 수 있다. DFS의 동작 방식에 따라 현재 위치가 `i`이고 `i`까지 경로의 깊이가 `n`이라 할때, `i+1`은 다음과 같이 정의된다.
- if) depth of `i+1` > n : `i+1`은 `i`의 하위 디렉토리 또는 파일
- if) depth of `i+1` == n : `i+1`은 `i`와 동일한 깊이에 있는 디렉토리 또는 파일
- if) depth of `i+1` < n : `i+1`은 `i`보다 상위에 있는 디렉토리 또는 파일

경로를 저장하는 배열 `path`가 있다고 하였을때,  `path[i] = j까지 도달하기 위해 지나쳐야하는 i번째 디렉토리(단, j > i)`이다. 이제 input을 `\n`을 기준으로 분해후 위의 정의에 따라 path를 업데이트 한다.
- if) depth of `i+1` > n : path에 i+1 추가
- if) depth of `i+1` == n : path[n]을 i+1로 대체
- if) depth of `i+1` < n : path[depth of `i+1`]을 i+1로 대체하고 depth of `i+1`이후의 인덱스를 비움

다음은 간단한 예이다.
```
input: "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1"
=> [dir, \tsubdir1, \t\tfile1.ext, \t\tsubsubdir1]
path = [];

1. dir
depth = 0, name = dir, path = [dir]

2. \tsubdir1
depth = \t = 1, name = subdir1, path = [dir, subdir1]

3. \t\tfile1.ext
depth = \t\t = 2, name = file1.ext, path = [dir, subdir1, file1.ext]

4. \t\tsubsubdir1
depth = \t\t = 2, name = subsubdir1, paht = [dir, subdir1, subsubdir1]
```

반환하고자 하는 값이 파일의 절대 경로 중 가장 긴 경로의 길이이기 때문에, 전체 과정에서 만난 file마다 경로의 길이를 계산하고, 가장 긴 길이를 저장하도록 한다.

## Code
<pre>
<code>
var lengthLongestPath = function(input) {
    const info = input.split('\n');
    
    const path = [info[0], ];
    let maxLength = (/\./).test(info[0]) ? path.join('/').length : 0;
    
    let preDepth = 0;
    for (let i = 1; i < info.length; i++) {
        let curDepth = 0;
        if ((/\t+/).test(info[i])) {
            curDepth = (/\t+/).exec(info[i])[0].length;
        }
        let dir = info[i].slice(curDepth);
        
        while (path.length-1 >= curDepth) path.pop();
        
        root.push(dir);
        if ((/\./).test(dir)) {  //dir가 파일이면
            const absPath = path.join('/');
            maxLength = absPath.length > maxLength ? absPath.length : maxLength;
        }
    }
    
    return maxLength;
};
</code>
</pre>
