var Twitter = function() {
    this.tweet = new Map();
    this._follow = new Map();
    this.tweet_order = 0;
};

Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!this.tweet.has(userId)) {
        this.tweet.set(userId, []);
    }
    this.tweet.get(userId).push({id: this.tweet_order, post: tweetId});
    this.tweet_order++;
};

Twitter.prototype.getNewsFeed = function(userId) {
    const userTweets = this.tweet.has(userId) ? this.tweet.get(userId) : [];
    const followeeList = this._follow.has(userId) ? Array.from(this._follow.get(userId)) : [];
    let followeeTweets = [];
    for (let followee of followeeList) {
        const t = this.tweet.has(followee) ? this.tweet.get(followee) : [];
        followeeTweets = followeeTweets.concat(t);
    }
    const tweets = userTweets.concat(followeeTweets);
    tweets.sort((a, b) => a.id - b.id);
    
    const result = [];
    let count = 10;
    while (tweets.length != 0 && count != 0) {
        result.push(tweets.pop().post);
        count--;
    }
    return result;
};

Twitter.prototype.follow = function(followerId, followeeId) {
    if (followerId == followeeId) return;
    
    if (!this._follow.has(followerId)) {
        this._follow.set(followerId, new Set());
    }
    this._follow.get(followerId).add(followeeId);
};

Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (!this._follow.has(followerId)) return;
    
    this._follow.get(followerId).delete(followeeId);
};
