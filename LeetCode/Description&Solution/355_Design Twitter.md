# 355. Design Twitter
출처: https://leetcode.com/problems/design-twitter/

## 문제

Design a simplified version of Twitter where users can post tweets, follow/unfollow another user and is able to see the 10 most recent tweets in the user's news feed. Your design should support the following methods:

1.  **postTweet(userId, tweetId)**: Compose a new tweet.
2.  **getNewsFeed(userId)**: Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
3.  **follow(followerId, followeeId)**: Follower follows a followee.
4.  **unfollow(followerId, followeeId)**: Follower unfollows a followee.

### 한글 요약 

다음의 기능을 갖는 트위터의 단순화 버전을 설계하라.
1. **postTweet(userId, tweetId)**: 새 트윗을 작성한다.
2. **getNewsFeed(userId)**:  사용자의 뉴스 피드에 최근 10개의 트윗을 가져온다. 뉴스 피드의 각 아이템은 사용자 자신 혹은 사용자가 팔로우한 사용자가 작성한 게시글이어야 한다. 트윗은 최근에 작성한 순서대로 정렬되어 있어야한다.
3. **follow(followerId, followeeId)**: 팔로워가 팔로이를 팔로우한다.
4. **unfollow(followerId, followeeId)**: 팔로워가 팔로이를 언팔한다.

## 예제

```
Twitter twitter = new Twitter();

// User 1 posts a new tweet (id = 5).
twitter.postTweet(1, 5);

// User 1's news feed should return a list with 1 tweet id -> [5].
twitter.getNewsFeed(1);

// User 1 follows user 2.
twitter.follow(1, 2);

// User 2 posts a new tweet (id = 6).
twitter.postTweet(2, 6);

// User 1's news feed should return a list with 2 tweet ids -> [6, 5].
// Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.getNewsFeed(1);

// User 1 unfollows user 2.
twitter.unfollow(1, 2);

// User 1's news feed should return a list with 1 tweet id -> [5],
// since user 1 is no longer following user 2.
twitter.getNewsFeed(1);
```

## 접근 방법

**postTweet**, **follow**, **unfollow** 기능은 맵(Map) 자료구조를 사용하여 저장 및 삭제가 용이하도록 하면 된다. 각각 한 유저가 여러 트윗을 작성할 수 있고, 여러 다른 사용자를 팔로우 할 수 있기 때문에 다음과 같이 맵과 배열을 조합하여 두 개의 저장소를 선언하였다.
```
tweet = new Map() // format: {key: userId, value: [tweetId, ...]}
follow = new Map() // format: {key: followerId, value: [followee, ...]}
```

**getNewsFeed** 기능을 구현하기 위해서는 다음 3가지가 필요하다.
- 사용자가 작성한 트윗 목록
- 사용자가 팔로우한 다른 사용자가 작성한 트윗 목록
- 각 트윗이 작성된 시기(혹은 순서)가 필요하다.

사용자가 작성한 트윗 목록의 경우, `tweet` 변수에서 userId를 통해 직접 접근하여 가져올 수 있고, 팔로우한 사용자의 트윗 목록은 `follow`에서 userId가 팔로우한 목록을 읽어와서 `tweet`에 접근하는 방식으로 가져올 수 있다. 문제는 tweetId가 트윗이 작성된 순서를 보장하지 않기 때문에 가져온 트윗 목록간의 순서를 알 수 없다는 것이다. 이를 위해서 트윗이 작성되어 입력될 때, 내부에서 별도로 순서를 매기는 방식을 사용하였다.

```
tweet_order = 0
tweet = new Map() // format: {key: userId, value: [{order:tweet_order, id:tweetId}, ...]}
```
 순서에 대한 별도의 변수(`tweet_order`)를 선언하고, 작성된 트윗이 저장되는 `tweet`에 저장되는 value가 단순히 tweetId만 저장하는 방식에서 tweet_order와 tweetId를 저장하는 방식으로 변경하였다. 이에 따라 **postTweet**은 다음과 같이 변경되어야 한다.
```
 func postTweet(userId, tweetId) {
	 if (tweet.has(userId) == false) {
		 tweet.set(userId, []);
	 }
	 tweet.get(userId).push({order:tweet_order, id:tweetId});
	 tweet_order += 1;
 }
```
 
 tweet_order로 인해서 각 트윗이 프로그램에 입력된 순서를 알 수 있기 때문에 이를 최근 순서로 10개를 가져와 반환하면 **getNewsFeed** 기능을 완성시킬 수 있다.
```
 func getNewsFeed(userId) {
	 // userTweets: 유저가 작성한 모든 트윗 목록
	 // followeeTweets: 유저가 팔로우한 모든 팔로이의 트윗 목록
	 allTweets = userTweets + followeeTweets;
	 allTweets.sort(key:order, order:descending);
	 return allTweets[0 ~ 9];
 }
```

## Full Source Code

|language|code|
|-|-
|JavaScript|[355.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/355.js)|
