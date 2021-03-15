class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        if columnNumber == 0:
            return '';
        return self.convertToTitle((columnNumber-1) // 26) + chr(((columnNumber-1) % 26) + 65);
