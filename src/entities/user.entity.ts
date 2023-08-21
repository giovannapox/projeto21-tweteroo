export class User {
    private _username: string;
    private _avatar: string;

    constructor(username: string, avatar: string){
        this._username = username;
        this._avatar = avatar;
    };

    get Username(){
        return this._username;
    };

    get Avatar(){
        return this._avatar;
    }
};