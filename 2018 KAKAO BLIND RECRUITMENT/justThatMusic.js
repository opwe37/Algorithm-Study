function solution(m, musicinfos) {
    var answer = '';

    var rememberedMelody = arrangeNote(m);

    var musicInfos = new Array()
    for (var i = 0; i < musicinfos.length; i++) {
        var tmp = musicinfos[i].split(',');
        var musicInfo = {
            playedTime: calcPlayTime(tmp[0], tmp[1]),
            name: tmp[2],
            melody: arrangeNote(tmp[3])
        };
        musicInfos.push(musicInfo);
    }

    var matchingMusic = new Array();
    for (var music = 0; music < musicInfos.length; music++) {
        // 재생된 시간만큼 멜로디 생성
        var playedMeldy = [];
        for (var musicTime = 0; musicTime < musicInfos[music].playedTime; musicTime++) {
            var pivot = musicTime;
            if (musicTime > (musicInfos[music].melody.length-1)) pivot = pivot % musicInfos[music].melody.length;
            playedMeldy.push(musicInfos[music].melody[pivot]);
        }

        // 기억하고 있는 멜로디만큼 나누어 비교
        var compareStartPoint = 0;
        while ((compareStartPoint+rememberedMelody.length) <=  playedMeldy.length) {
            var melody = '';
            for (var i = 0; i < rememberedMelody.length; i++) {
                melody += playedMeldy[compareStartPoint + i];
            }
            if (m == melody) {
                matchingMusic.push(musicInfos[music]);
                break;
            }
            compareStartPoint++;
        }
    }

    if (matchingMusic.length == 0)  answer = "(None)";
    else if (matchingMusic.length == 1) answer = matchingMusic[0].name;
    else {
        var playtime = [];
        for (var i = 0; i < matchingMusic.length; i++) {
            playtime.push(matchingMusic[i].playedTime);
        }
        answer = matchingMusic[playtime.indexOf(Math.max(...playtime))].name;
    }

    return answer;
}

function arrangeNote(notes) {
    var regExp = /[A-Z]#?/g;
    return notes.match(regExp);
}

function convertTime(time) {
    var tmp = time.split(':');
    return (tmp[0] * 60) + tmp[1];
}

function calcPlayTime(start, end) {
    var s = convertTime(start);
    var e = convertTime(end);
    return (e - s);
}
