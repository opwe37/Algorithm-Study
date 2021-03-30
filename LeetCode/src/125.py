import re
class Solution:
    def isPalindrome(self, s: str) -> bool:
        p = re.compile("[^a-z0-9]")
        s = p.sub('', s.lower())
        if s == s[::-1]:
            return True
        else:
            return False
