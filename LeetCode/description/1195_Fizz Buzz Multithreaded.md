# 1195. Fizz Buzz Multithreaded

출처: https://leetcode.com/problems/fizz-buzz-multithreaded/

## 문제

Write a program that outputs the string representation of numbers from 1 to _n_, however:

-   If the number is divisible by 3, output "fizz".
-   If the number is divisible by 5, output "buzz".
-   If the number is divisible by both 3 and 5, output "fizzbuzz".

1부터 _n_의 숫자를 출력하는 프로그램을 작성하라. 하지만:
- 만약 숫자가 3으로 나누어진다면, "fizz"를 출력하라.
- 만약 숫자가 5로 나누어진다면, "buzz"를  출력하라.
- 만약 숫자가 3과 5로 나누어진다면, "fizzbuzz"를 출력하라.

For example, for `n = 15`, we output: `1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz`.

예를 들어, `n=15`일때, 출력은 `1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz`이다.

Suppose you are given the following code:

<pre><code>
class FizzBuzz {
  public FizzBuzz(int n) { ... }               // constructor
  public void fizz(printFizz) { ... }          // only output "fizz"
  public void buzz(printBuzz) { ... }          // only output "buzz"
  public void fizzbuzz(printFizzBuzz) { ... }  // only output "fizzbuzz"
  public void number(printNumber) { ... }      // only output the numbers
}
</code></pre>

Implement a multithreaded version of  `FizzBuzz`  with  **four**  threads. The same instance of  `FizzBuzz`  will be passed to four different threads:

1.  Thread A will call `fizz()` to check for divisibility of 3 and outputs `fizz`.
2.  Thread B will call `buzz()` to check for divisibility of 5 and outputs `buzz`.
3.  Thread C will call  `fizzbuzz()` to check for divisibility of 3 and 5 and outputs `fizzbuzz`.
4.  Thread D will call  `number()`  which should only output the numbers.

**4**개의 쓰레드를 가진 `FizzBuzz`의 멀티-쓰레드 버전을 구현하라. `FizzBuzz`의 동일한 인스턴스는 4개의 다른 쓰레드에 전달될 것이다.
1. ThreadA는 3으로 나누어지는지 체크하고 `fizz`를 출력하기 위해 `fizz()`를 호출할 것이다.
2. ThreadB는 5로 나누어지는지 체크하고 `buzz`를 출력하기 위해 `buzz()`를 호출할 것이다.
3. ThreadC는 3과 5로 나누어지는지 체크하고 '`fizzbuzz`를 출력하기 위해 `fizzbuzz()`를 호출할 것이다. 
4. ThreadD는 오직 숫자를 출력하기 위해 `number()`를 호출할 것이다. 

## 접근 방법

Python에서 쓰레드간의 동기화를 위해서 `threading` 모듈을 통해 `Lock, Event, Condition, Semaphore, Barrier` 등을 제공한다. 이러한 기능 중에서 `Barrier`를 사용하여 이 문제를 해결해보았다.

`Barrier`는 장벽이라는 단어 뜻에서 볼 수 있듯이, 프로세스가 진행되는 도중에 더 이상 진행되지 않도록 막아주는 역할을 한다. 이 장벽을 넘어가기 위해서는 고정된 수의 쓰레드가 모여한다. `Barrier`의 동작은 다음과 같다.

- `Barrier` 선언 시, 장벽을 넘어가기 위해 모여야하는 쓰레드 수를 지정
- 쓰레드 내부에서 `wait()`함수를 통해서 장벽과 마주하였음을 알리는 신호를 발생
- 지정된 수의 쓰레가 모였을 때, `wait()` 이후의 작업 수행

결과적으로 쓰레드 내부의 진행을 `Barrier`를 통해 막음으로써 각 쓰레드의 진행을 동기화하는 결과를 가져온다.

`Barrier`를 통해 위 문제를 푼 코드는 다음과 같다.
<pre>
<code># Python3 Code
from threading import Barrier

class FizzBuzz:
	def __init__(self, n):
		self.n = n
		self.b = Barrier(4)
		
	def fizz(self, printFizz: 'Callable[[], None]') -> None:
		for i in range(1, self.n+1):
			if not i % 3 and i % 5:
				printFizz()
			self.b.wait()
			
	def buzz(self, printBuzz: 'Callable[[], None]') -> None:
		for i in range(1,self.n+1):
			if not i % 5 and i % 3:
				printBuzz()
			self.b.wait()
	
	def fizzbuzz(self, printFizzBuzz: 'Callable[[], None]') -> None:
		for i in range(1, self.n+1):
			if not i % 5 and not i % 3:
				printFizzBuzz()
			self.b.wait()
	
	def number(self, printNumber: 'Callable[[int], None]') -> None:
		for i in range(1, self.n+1):
			if i % 5 and i % 3:
				printNumber()
			self.b.wait()
</code>
</pre>

각 함수에서 `for` 구문을 통해 1부터 _n_ 까지 반복하면서 각 함수의 기능에 맞는 조건을 체크한다(`fizz`는 3으로 나누어지는지, `buzz`는 5로 나누어지는지, `fizzbuzz`는 15로 나누어지는지...).
출력 조건에 맞다면 출력 함수를 실행시킨다. 이후, `Barrier`를 통해 다른 함수의 동작을 기다리게 한다. 

위의 코드의 개선점에 대해서 생각해보면, 각 함수(`fizz, buzz, fizzbuzz, number`)의 모습이 전반적으로 유사함을 알 수 있다. 다른점은 함수 내부에서 호출하는 함수의 이름과 그 함수를 호출하기 위한 조건절이다. 이를 하나의 함수에서 관리하기 위하여 `handler()`함수를 추가로 생성하였다.
<pre>
<code># Python3 Code
class FizzBuzz:
	def __init__(self, n):
		...
	
	def handler(self, check, sucess, param=False) -> Non:
		for i in range(1, self.n +1):
			if check(i):
				sucess(i) if param else sucess()
			self.b.wait()

	def fizz(self, printFizz: 'Callable[[], None]') -> None:
		self.handler(lambda x: not x % 3 and x % 5, printFizz)
	
	def buzz(self, printBuzz: 'Callable[[], None]') -> None:
		self.handler(lambda x: x % 3 and not x % 5, printBuzz)
	
	def fizzbuzz(self, printFizzBuzz: 'Callable[[], None]') -> None:
		self.handler(lambda x: not x % 3 and not x % 5, printFizzBuzz)
	
	def number(self, printNumber: 'Callable[[int], None]') -> None:
		self.handler(lambda x: x % 3 and x % 5, printNumber, True)
</code>
</pre>

`handler()`는 `check, sucess, param`을 인자로 받는다.
- `check` : `sucess`로 넘어온 함수의 실행 여부를 판단하는 함수, `True` 혹은 `False`값을 반환
- `sucess` : `check()`가 `True`일때 실행될 함수 (`printFizz, printBuzz, printFizzBuzz, printNumber`가 해당됨)
- `param` : `sucess()` 함수에 넘겨야 하는 파라미터 인자가 있는지 없는지에 대한 부울 값

## Full Code
|language|url|
|--------|---|
|Python3|[1195.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1195.py)|
