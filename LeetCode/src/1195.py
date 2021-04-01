import threading

class FizzBuzz:
    def __init__(self, n: int):
        self.n = n
        self.b = threading.Barrier(4)

    # printFizz() outputs "fizz"
    def fizz(self, printFizz: 'Callable[[], None]') -> None:
        self.handler(lambda x: x % 3 == 0 and x % 5, printFizz)

    # printBuzz() outputs "buzz"
    def buzz(self, printBuzz: 'Callable[[], None]') -> None:
        self.handler(lambda x: x % 5 == 0 and x % 3, printBuzz)

    # printFizzBuzz() outputs "fizzbuzz"
    def fizzbuzz(self, printFizzBuzz: 'Callable[[], None]') -> None:
        self.handler(lambda x: x % 5 == 0 and x % 3 == 0, printFizzBuzz)

    # printNumber(x) outputs "x", where x is an integer.
    def number(self, printNumber: 'Callable[[int], None]') -> None:
        self.handler(lambda x: x % 5 and x % 3, printNumber, True)
    
    def handler(self, check, sucess, parameter=False):
        for i in range(1, self.n+1):
            if check(i): 
                sucess(i) if parameter else sucess()
            self.b.wait()
        
