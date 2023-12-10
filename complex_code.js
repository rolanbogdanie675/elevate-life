/*
Filename: complex_code.js

This code demonstrates a complex implementation of a social media platform. It includes functions for user authentication, creating posts, following/unfollowing other users, and displaying feeds.

Note: This code is only a demonstration and may not contain complete error handling or other best practices.

*/

// User class
class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.posts = [];
    this.following = new Set();
    this.followers = new Set();
  }

  authenticate(username, password) {
    return this.username === username && this.password === password;
  }

  createPost(content) {
    const post = new Post(this, content);
    this.posts.push(post);
    return post;
  }

  follow(user) {
    this.following.add(user);
    user.followers.add(this);
  }

  unfollow(user) {
    this.following.delete(user);
    user.followers.delete(this);
  }

  getFeed() {
    const feed = [];
    for (let follower of this.followers) {
      feed.push(...follower.posts);
    }
    return feed.sort((a, b) => b.timestamp - a.timestamp);
  }
}

// Post class
class Post {
  constructor(user, content) {
    this.user = user;
    this.content = content;
    this.timestamp = Date.now();
  }

  display() {
    console.log(`${this.user.username} (${this.user.email}): ${this.content}`);
  }
}

// Create sample users
const user1 = new User("johnDoe", "password1", "john.doe@example.com");
const user2 = new User("janeSmith", "password2", "jane.smith@example.com");
const user3 = new User("bobJohnson", "password3", "bob.johnson@example.com");

// Authenticate users
console.log(user1.authenticate("johnDoe", "password1")); // true
console.log(user2.authenticate("johnDoe", "password1")); // false

// Create and display posts
const post1 = user1.createPost("Hello, world!");
const post2 = user2.createPost("Good morning, everyone!");
const post3 = user3.createPost("Testing...");

post1.display(); // johnDoe: Hello, world!
post2.display(); // janeSmith: Good morning, everyone!
post3.display(); // bobJohnson: Testing...

// Follow/unfollow users
user1.follow(user2);
user3.follow(user2);
console.log(user1.following); // Set { user2 }
console.log(user3.following); // Set { user2 }

user1.unfollow(user2);
console.log(user1.following); // Set {}

// Display feed
console.log(user2.getFeed()); // [ post3, post2 ]