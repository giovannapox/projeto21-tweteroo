import { Injectable } from '@nestjs/common';
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

  getTweets(){
    return this.tweets.slice(-15);
  };
}
