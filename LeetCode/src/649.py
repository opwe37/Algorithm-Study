class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        remain_R = remain_D = 1
        banned_R = banned_D = 0
        while remain_R != 0 and remain_D != 0:
            remain_R = remain_D = 0
            next_round = ''
            for senator in senate:
                if senator == 'R':
                    if banned_R:
                        banned_R -= 1
                    else:
                        next_round += senator
                        remain_R, banned_D = remain_R+1, banned_D+1
                else:
                    if banned_D:
                        banned_D -= 1
                    else:
                        next_round += senator
                        remain_D, banned_R = remain_D+1, banned_R+1
            senate = next_round
            
        return "Radiant" if remain_R else "Dire"
