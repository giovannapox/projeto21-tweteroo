import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetDto } from './dtos/tweet.dto';


@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [new User('Gustavo1','https://www.google.com.br/')];
    this.tweets = [];
  };

  health() {
    return "I'm okay!";
  }

  postSignUp(body: User){
    return this.users.push(body);
  };

  postTweets(body){
    const user = this.users.find((e) => e.Username === body.username);
    console.log(user);
    if(!user) {
      throw UnauthorizedException;
    }
    const novoTweet = new Tweet(user.Username, user.Avatar, body.tweet)
    return this.tweets.push(novoTweet);
  };

  getTweets(page: number){
    if(!page){
      return this.tweets.slice(-15);
    } else {
    if(isNaN(page) || page < 1){
      throw BadRequestException;
    }
    
    const start = (page - 1) * 5;
    const end = page * 5;

    return this.tweets.slice(start, end);
  }
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