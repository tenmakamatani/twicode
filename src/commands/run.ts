import * as vscode from 'vscode';

import { TwitterClient } from '../lib/TwitterClient';

export const run = async () => {

  // Create TwtterClient
  const twitter = new TwitterClient();

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