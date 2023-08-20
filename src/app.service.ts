import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';


@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  };

  postSignUp(body: User){
    return this.users.push(body);
  };

  postTweets(body: Tweet){
    const user = this.users.find((e) => e.Username === body.Username);
    if(!user) {
      throw UnauthorizedException;
    }

    const tweet = new Tweet("", "", "");
    tweet.setValues(body.Username, body.Avatar, body.Tweet);
    return this.tweets.push(tweet);
  };

  getTweets(page: number){
    
    if(isNaN(page) || page < 1){
      throw BadRequestException;
    }

    const start = (page - 1) * 15;
    const end = page * 15;
    
    return this.tweets.slice(start, end);
  };

  getTweetsByUsername(username: string){
    const user = this.users.find((e) => e.Username === username);

    if (!user) {
      return []; 
    }

    return this.tweets
    .filter((tweet) => tweet.Username === username)
    .map((tweet) => ({
      username: tweet.Username,
      avatar: tweet.Avatar,
      tweet: tweet.Tweet,
    }));
  
  };
}
