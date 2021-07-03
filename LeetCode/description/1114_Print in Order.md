# 1114. Print in Order

출처: https://leetcode.com/problems/print-in-order/

## 문제

Suppose we have a class:
<pre>
<code>
public class Foo {
  public void first() { print("first"); }
  public void second() { print("second"); }
  public void third() { print("third"); }
}
</code>
</pre>

The same instance of  `Foo`  will be passed to three different threads. Thread A will call  `first()`, thread B will call  `second()`, and thread C will call  `third()`. Design a mechanism and modify the program to ensure that `second()` is executed after `first()`, and `third()`  is executed after `second()`.

`Foo()`의 인스턴스가 세개의 다른 쓰레드를 통과한다. 쓰레드 A는 `first()`를 호출하고, 쓰레드 B는 `second()`를 호출한다. 그리고 쓰레드 C는 `third()`를 호출한다. `first() -> second() -> thrid()` 순서로 실행이 되도록 하라.

## Example
```
Input: [1,2,3]
Output: "firstsecondthird"
Explanation: There are three threads being fired asynchronously. The input [1,2,3] means thread A calls first(), thread B calls second(), and thread C calls third(). "firstsecondthird" is the correct output.
```
```
Input: [1,3,2]
Output: "firstsecondthird"
Explanation: The input [1,3,2] means thread A calls first(), thread B calls third(), and thread C calls second(). "firstsecondthird" is the correct output.
```
## 접근 방법

Python에서 쓰레드간의 동기화를 위한 `threading` 모듈에서 `Event` 를 사용하여 문제 해결

`Event`는 `set()`함수의 호출을 통해 이벤트 발생 여부를 기록하고, `wait()`은 이벤트 발생 여부를 체크하여 발생했다면 프로세스를 진행시키고, 발생하지 않았다면 프로세스를 일시정지 시키는 기능을 한다.

<pre>
<code>
import threading

class Foo:
    def __init__(self):
        self.first_event = threading.Event()
        self.second_event = threading.Event()

    def first(self, printFirst: 'Callable[[], None]') -> None:
        # printFirst() outputs "first ". Do not change or remove this line.
        printFirst()
        self.first_event.set()

    def second(self, printSecond: 'Callable[[], None]') -> None:
        self.first_event.wait()
        # printSecond() outputs "second". Do not change or remove this line.
        printSecond()
        self.second_event.set()

    def third(self, printThird: 'Callable[[], None]') -> None:
        self.second_event.wait()
        # printThird() outputs "third". Do not change or remove this line.
        printThird()
</code>
</pre>
위의 코드와 같이 `first`와 `second`의 실행을 체크할 `Event`를 선언하고 해당 함수의 마지막에 `set()`을 호출한다. `second()`와 `thrid()`에서는 함수 진입과 동시에 이벤트를 체크할 수 있도록 `wait()`을 호출하여 전체적인 진행 순서를 동기화하도록 하였다.

## Full Code
|language|url|
|--------|---|
|Python3|[1114.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1114.py)|
