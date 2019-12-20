import Twitter from 'twitter';
import * as vscode from 'vscode';

class TwitterClient {

  twitter: Twitter;

  // Setup twitter
  constructor(
    CONSUMER_KEY: string,
    CONSUMER_SECRET: string,
    ACCESS_TOKEN_KEY: string,
    ACCESS_TOKEN_SECRET: string
  ) {

    this.twitter = new Twitter({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      access_token_key: ACCESS_TOKEN_KEY,
      access_token_secret: ACCESS_TOKEN_SECRET
    });
  }

  getUserName(): Promise<string> {
    const twitter = this.twitter;
    return new Promise((resolve, reject) => {
      twitter.get('account/verify_credentials', (err, data) => {
        if (err) {
          reject();
        }
        let name = data.name.replace(/\..+$/, '');
        resolve(name);
      });
    });
  }

  updateUserName(params: Object): Promise<string> {
    const twitter = this.twitter;
    return new Promise((resolve, reject) => {
      twitter.post('account/update_profile', params, (err, data) => {
        if (err) {
          reject();
        }
        resolve(data.name);
      });
    });
  }

}

export { TwitterClient };
