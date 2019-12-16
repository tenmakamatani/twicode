import Twitter from 'twitter';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

class TwitterClient {

  twitter: Twitter;

  // Setup twitter
  constructor() {

    // Enable environment values
    dotenvConfig({
      path: resolve(__dirname, '../../.env')
    });
    const {
      CONSUMER_KEY,
      CONSUMER_SECRET,
      ACCESS_TOKEN_KEY,
      ACCESS_TOKEN_SECRET
    } = process.env;

    this.twitter = new Twitter({
      consumer_key: CONSUMER_KEY ? CONSUMER_KEY : '',
      consumer_secret: CONSUMER_SECRET ? CONSUMER_SECRET : '',
      access_token_key: ACCESS_TOKEN_KEY ? ACCESS_TOKEN_KEY : '',
      access_token_secret: ACCESS_TOKEN_SECRET ? ACCESS_TOKEN_SECRET : ''
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
