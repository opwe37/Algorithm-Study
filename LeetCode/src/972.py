from fractions import Fraction

class Solution:
    def isRationalEqual(self, s: str, t: str) -> bool:
        def convert(S):
            # 정수 판단
            if '.' not in S:
                return Fraction(int(s))
            
            # 유한 소수 판단
            dot_index = S.index('.')
            answer= Fraction(int(S[:dot_index]), 1)
            S = S[dot_index + 1:]
            if '(' not in S:
                if S:
                    ansewr += Fraction(int(S), 10**len(S))
                return answer
            
            # 무한 소수 판단
            idx = S.index('(')
            if idx:
                answer += Fraction(int(S[:idx]), 10**idx)
            S = S[idx+1:-1]
            answer += Fraction(int(S), 10**idx * (10**len(S)-1))
            return answer
        
        return convert(s) == convert(t)
