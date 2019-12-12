import * as vscode from 'vscode';

import { getUserName, updateUserName } from './twitter';

export const main = async () => {
  // Get twitter username
  let name;
  try {
    name = await getUserName();
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
      updatedName = await updateUserName(params);
    } catch {
      vscode.window.showErrorMessage('Could not update username!');
    }
    vscode.window.showInformationMessage(`Name changed to ${updatedName}!`);
  } else {
    vscode.window.showErrorMessage('Could not update username!');
  }

};