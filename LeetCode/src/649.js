var predictPartyVictory = function(senate) {
    let r_ban = 0, d_ban = 0;
    let r_count = 1, d_count = 1;
    while (r_count != 0 && d_count != 0) {
        let next_round_senate = '';
        r_count = 0, d_count = 0;
        
         for (let i = 0; i < senate.length; i++) {
            if (senate[i] == 'R') {
                if (r_ban) {
                    r_ban -= 1;
                } else {
                    next_round_senate += 'R';
                    r_count += 1;
                    d_ban += 1;
                }
            } else if (senate[i] == 'D'){
                if (d_ban) {
                    d_ban -= 1;
                } else {
                    next_round_senate += 'D';
                    d_count += 1;
                    r_ban += 1;
                }
            }
        }
        senate = next_round_senate;
    }
    
    return r_count > d_count ? 'Radiant' : 'Dire';
};
