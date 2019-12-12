import Twitter from 'twitter';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

// Enable environment values
dotenvConfig({
  path: resolve(__dirname, '../../.env')
});
const env = process.env;
const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET
} = env;

// Setup twitter client
const client = new Twitter({
  consumer_key: CONSUMER_KEY ? CONSUMER_KEY : '',
  consumer_secret: CONSUMER_SECRET ? CONSUMER_SECRET : '',
  access_token_key: ACCESS_TOKEN_KEY ? ACCESS_TOKEN_KEY : '',
  access_token_secret: ACCESS_TOKEN_SECRET ? ACCESS_TOKEN_SECRET : ''
});

export const getUserName = () => {
  return new Promise((resolve, reject) => {
    client.get('account/verify_credentials', (err, data) => {
      if (err) {
        console.log(err);
        reject();
      }
      let name = data.name.replace(/\..+$/, '');
      resolve(name);
    });
  });
};

export const updateUserName = (parmas: Object) => {
  return new Promise((resolve, reject) => {
    client.post('account/update_profile', parmas, (err, data) => {
      if (err) {
        reject();
      }
      resolve(data.name);
    });
  });
};