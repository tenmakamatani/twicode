import * as vscode from 'vscode';

import { TwitterClient } from '../lib/TwitterClient';

export const run = async () => {

  // Create TwtterClient
  const configuration = vscode.workspace.getConfiguration('twitter');
  // Enable environment values
  const CONSUMER_KEY = configuration.get('consumerkey') as string;
  const CONSUMER_SECRET = configuration.get('consumersecret') as string;
  const ACCESS_TOKEN_KEY = configuration.get('accesstokenkey') as string;
  const ACCESS_TOKEN_SECRET = configuration.get('accesstokensecret') as string;
  if (!(CONSUMER_KEY && CONSUMER_SECRET && ACCESS_TOKEN_KEY && ACCESS_TOKEN_SECRET)) {
    vscode.commands.executeCommand('twicode.register');
    return;
  }
  const twitter = new TwitterClient(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_SECRET
  );

  // Get twitter username
  let name;
  try {
    name = await twitter.getUserName();
  } catch {
    vscode.window.showErrorMessage('Could not get twitter username!');
  }
  if (!name) {
    vscode.window.showErrorMessage('Twitter username is empty!');
  }

  // Get extension of editing file
  const langs = vscode.window.activeTextEditor;
  let extension;
  if (langs) {
    extension = langs.document.uri.fsPath.split('.').pop();
  } else {
    vscode.window.showErrorMessage('Please open any files!');
  }

  // Update username
  if (name && langs) {
    const params = {
      name: `${name}.${extension}`
    };
    let updatedName;
    try {
      updatedName = await twitter.updateUserName(params);
    } catch {
      vscode.window.showErrorMessage('Could not update username!');
    }
    vscode.window.showInformationMessage(`Name changed to ${updatedName}!`);
  } else {
    vscode.window.showErrorMessage('Could not update username!');
  }

};