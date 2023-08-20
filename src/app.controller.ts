import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTweetDto } from './dtos/tweet.dto';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHealth() {
    return this.appService.health();
  }
  
  @Post("sign-up")
  @HttpCode(200)
  postSignUp(@Body() body: CreateUserDto){
    const userBody = new User(body.username, body.avatar);
    return this.appService.postSignUp(userBody);
  };

  @Post("tweets")
  postTweets(@Body() body: CreateTweetDto) {
    try {
      const userBody = new Tweet(body.username, body.avatar, body.tweet);
      return this.appService.postTweets(userBody);
    } catch (err) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    };
  };

  @Get("tweets")
  getTweets(@Query('page') page: number){
    try {
      return this.appService.getTweets(page);
    } catch (err) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST)
    };
  };

  @Get("tweets/:username")
  getTweetsByUsername(@Param('username') username: string){
    return this.appService.getTweetsByUsername(username);
  };
}
