import collections

class FreqStack:

    def __init__(self):
        self.freq = collections.defaultdict(int)
        self.group = collections.defaultdict(list)
        self.max_freq = 0
        
    def push(self, x: int) -> None:
        self.freq[x] += 1
        self.max_freq = max(self.max_freq, self.freq[x])
        self.group[self.freq[x]].append(x)

    def pop(self) -> int:
        result = self.group[self.max_freq].pop()
        self.freq[result] -= 1
        if not self.group[self.max_freq]:
            self.max_freq -= 1
        return result
