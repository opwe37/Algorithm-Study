function solution(word, pages) {
  var answer = 0;
  var urls = findUrl(pages);
  var basicScore = calcBasicScore(word, pages);
  var numOflink = findExternalLink(urls, pages);

  var matchingScore = [];
  for (let i = 0; i < pages.length; i++) {
    matchingScore.push(0);
    let cpyBasic = basicScore.slice()
      , cpyLink = numOflink.slice()
      , cpyPage = pages.slice();
    
    cpyBasic.splice(i, 1);
    cpyLink.splice(i, 1);
    cpyPage.splice(i, 1);

    matchingScore[i] += basicScore[i] + calcLinkScore(urls[i], cpyBasic, cpyLink, cpyPage);
  }

  var maxVal = matchingScore.reduce(function (pre, cur) {
    return pre > cur ? pre : cur;
  });
  answer = matchingScore.indexOf(maxVal);

  return answer;
}

function findUrl(pages) {
  var urls = [];
  var regex = new RegExp("<meta property=\"og:url\" content=\"https://(.+?)\"/>")
  for (let page of pages) {
    let url = page.match(regex);
    urls.push(url[1]);
  }
  return urls;
}

function calcBasicScore(word, pages) {
  var regex = new RegExp('.?'+word+'.?', 'gi');
  var count = [];
  for (let i = 0; i < pages.length; i++) {
    count.push(0);
    let candidateWords = pages[i].match(regex);
    if (candidateWords == null) continue;
    for (let str of candidateWords) {
      let tmp = str.trim().replace(/[^a-zA-Z]/g,' ').trim();
      if (tmp.length == word.length) count[i]++;
    }
  }
  return count;
}

function findExternalLink(urls, pages) {
  var count = [];
  var regex = new RegExp("<a href=\"https://(.+?)\">", 'g');
  for (let i = 0; i < pages.length; i++) {
    count.push(0);
    let link = pages[i].match(regex);
    if (link == null) continue;
    count[i] = link.length;
  }
  return count;
}

function calcLinkScore(url, basicScore, externalLink, pages) {
  var score = 0;
  var regex = new RegExp("<a href=\"https://"+url+"\">");
  for (let i = 0; i < pages.length; i++) {
    let link = pages[i].match(regex);
    if (link != null) {
      score += basicScore[i] / externalLink[i];
    }
  }
  return score;
}
