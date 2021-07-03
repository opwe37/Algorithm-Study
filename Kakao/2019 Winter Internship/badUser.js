function solution(user_id, banned_id) {
    var answer = 0;

    var ban = [];
    for (let b of banned_id) {
      let reg = convertIdToRegxp(b);
      let list = [];
      for (let u of user_id) {
        if (reg.test(u) && u.length == b.length) {
          list.push(u);
        }
      }
      ban.push(list.slice());
    }

    var ban_candidate = [];
    function searchBannedUser(ban_list, candidate) {
      if (candidate.size == banned_id.length) {
          let flag = ban_candidate.every((e) => eqSet(e, candidate) == false)
          if (flag) ban_candidate.push(candidate);
        return;
      }

      var curBanList = ban_list[0];  
      for (let i = 0; i < curBanList.length; i++) {
        let tmp = new Set(candidate);
        let preSize = tmp.size;
        tmp.add(curBanList[i]);
        if (tmp.size != preSize+1) continue;

        searchBannedUser(ban_list.slice(1), tmp);
      }
    }

    searchBannedUser(ban, new Set(), banned_id.length);
 
    return ban_candidate.length;  
}

function convertIdToRegxp(id) {
  var reg = '';
  for (let i = 0; i < id.length; i++) {
    if (id[i] != '*') {
      reg += id[i];
    } else {
      reg += '[a-z0-9]'
    }
  }
  return new RegExp(reg);
}

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (let a of as) if (!bs.has(a)) return false;
    return true;
}
