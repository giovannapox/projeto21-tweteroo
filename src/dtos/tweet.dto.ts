import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    tweet: string
};