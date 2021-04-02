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
