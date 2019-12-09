import * as vscode from 'vscode';

import Twitter from 'twitter';
import { config as dotenvConfig } from 'dotenv';

// Enable environment values
dotenvConfig();
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

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "twicode" is now active!');

  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
