# 1115. Print FooBar Alternately

출처 : https://leetcode.com/problems/print-foobar-alternately/

## 문제

Suppose you are given the following code:

다음의 코드를 가정해보자:
```
class FooBar {
  public void foo() {
    for (int i = 0; i < n; i++) {
      print("foo");
    }
  }

  public void bar() {
    for (int i = 0; i < n; i++) {
      print("bar");
    }
  }
}
```
The same instance of  `FooBar`  will be passed to two different threads. Thread A will call `foo()`  while thread B will call `bar()`. Modify the given program to output "foobar"  _n_  times.

`FooBar`와 같은 인스턴스가 두 개의 다른 쓰레드를 통과할 것이다. 쓰레드 A가 `foo()`를 호출하고 쓰레드 B는 `bar()`를 호출할 것이다. 주어진 프로그램이 "foobar"를 _n_ 회 출력하도록 수정하시오.

## 예제

```
Input: n = 1
Output: "foobar"
Explanation: There are two threads being fired asynchronously. One of them calls foo(), while the other calls bar(). "foobar" is being output 1 time.
```
```
Input: n = 2
Output: "foobarfoobar"
Explanation: "foobar" is being output 2 times.
```

## 접근방법

쓰레드의 동기화 혹은 상태제어를 할 수 있는지를 묻는 문제

두 쓰레드가 공유하는 불린(Boolean)형 변수를 선언 및 사용하여 두 쓰레드 사이의 싱크를 맞추는 방법으로 문제에 접근. 쓰레드의 일시정지 및 재실행을 위해서 wait()와 notify()함수를 사용함(JAVA 기준).

자바에서 wait()와 notify()는 Object단에서 선언된 함수로 syncronized영역에서 사용할 수 있는 함수이다.
- wait() : 쓰레드를 일시정지 상태로 만든다.
- notify() :  일시정지 상태에 놓인 쓰레드 중 하나를 활성화시킨다.

구현에 필요한 개념과 함수는 모두 준비가 되었다. 실제 쓰레드가 동작해야하는 방식에 맞춰 wait() 또는 notify()가 호출되도록 구현해야 한다. 두 쓰레드가 동작하는 방식은 아래와 같아야 한다.
```
Thread A { for(0 to n) {print "foo";}}
Thread B { for(0 to n) {print "bar";}}

쓰레드 A와 쓰레드 B가 동시에 호출되었다.
쓰레드 B는 반복문 시작과 동시에, "bar"를 출력하기 전에 일시정지되어야 한다.
쓰레드 A는 "foo"를 출력하고, 쓰레드 B를 깨운다.
쓰레드 A는 쓰레드 B를 깨운 후 일시정지된다.
쓰레드 B는 "bar"를 출력하고, 쓰레드 A를 깨운다.
쓰레드 B는 쓰레드 A를 깨운 후 일시정지된다.
```
아래는 위의 동작 방식에 맞추어 Thread A에 대한 구현 방식을 간략히 표현한 것이다.
```
// Thread A와 B의 싱크를 맞추기 위한 변수 선언
boolean isA = true;
Thread A {
	for (0 to n) {
		// 반복문 입장과 동시에, A의 차례인지 확인하여 A 차례가 아니라면 일시정지로 만듦
		if (!isA) wait();
		
		print "foo";
		
		// A의 차례가 끝났기 때문에 공유변수를 B 차례로 표시하고, B를 깨운다.
		isA = !isA;
		notify();
	}
}
```
Thread B도 같은 방식으로 수정하면 두 쓰레드가 맞물려 동작하게 된다.

## Code

<pre>
<code>
class FooBar {
    private int n;
    private boolean flag = true;

    public FooBar(int n) {
        this.n = n;
    }

    public synchronized void foo(Runnable printFoo) throws InterruptedException {
        
        for (int i = 0; i < n; i++) {
            if (!flag) wait();
            
        	// printFoo.run() outputs "foo". Do not change or remove this line.       
            printFoo.run();
            
            flag = !flag;
            notify();
        }
    }

    public synchronized void bar(Runnable printBar) throws InterruptedException {
        
        for (int i = 0; i < n; i++) {
            if (flag) wait();
            
            // printBar.run() outputs "bar". Do not change or remove this line.       
            printBar.run();
            
            flag = !flag;
            notify();
        }
    }
}
</code>
</pre>
