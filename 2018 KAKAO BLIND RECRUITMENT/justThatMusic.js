function solution(m, musicinfos) {
    var answer = '';

    var rememberedMelody = arrangeNote(m);

    var musicInfo = new Array()
    for (var i = 0; i < musicinfos.length; i++) {
        var tmp = musicinfos[i].split(',');
        var info = {
            playedTime: calcPlayTime(tmp[0], tmp[1]),
            name: tmp[2],
            melody: arrangeNote(tmp[3])
        };
        musicInfo.push(info);
    }

    var matchedSong = new Array();
    for (var music = 0; music < musicInfo.length; music++) {
        var playedMeldy = '';
        for (var i = 0; i < musicInfo[music].playedTime; i++) {
            playedMeldy += musicInfo[music].melody[i % musicInfo[music].melody.length];
        }
        if (playedMeldy.includes(rememberedMelody)) {
            matchedSong.push(musicInfo[music]);
        }
    }

    if (matchedSong.length > 0) {
        var result = matchedSong.reduce((a, c) => a.playedTime >= c.playedTime ? a : c);
        answer = result.name;
    } else {
        answer = "(None)";  
    }

    return answer;
}

function arrangeNote(notes) {
    var regExp = /[A-Z]#?/g;
    var melody = notes.match(regExp);
    melody.forEach(function(item, index, arr){
        switch(item) {
            case 'C#': arr[index] = 'c'; break;
            case 'D#': arr[index] = 'd'; break;
            case 'F#': arr[index] = 'f'; break;
            case 'G#': arr[index] = 'g'; break;
            case 'A#': arr[index] = 'a'; break;
        }
    });
    return melody.join('');
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
