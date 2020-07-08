function solution(genres, plays) {
    var answer = [];
    
    var genre = new Map();
    var music = [];
    for (let i = 0; i < genres.length; i++) {
        music.push({genre: genres[i], idx: i, play: plays[i]});
        if (genre.has(genres[i])) {
            let total = genre.get(genres[i]);
            total += plays[i];
            genre.set(genres[i], total);

        }else {
            genre.set(genres[i], plays[i]);

        }
    }
    genre = Array.from(genre.entries());
    genre.sort((a, b) => {
        if (a[1] < b[1]) {
          return 1;
        } else if (a[1] > b[1]){
          return -1;
        } else {
          return 0;
        }
    });

    for (let [name, plays] of genre) {
        let g = music.filter(val => val.genre == name);
        g.sort((a, b) => {
          if (a.play < b.play) {
          return 1;
        } else if (a.play > b.play){
          return -1;
        } else {
          return 0;
        }
        });

        answer.push(g[0].idx);
        if (g.length > 1) answer.push(g[1].idx);
    }
    
    return answer;
}
