import * as vscode from 'vscode';

import { getUserName, updateUserName } from './libs/twitter';
import { sleep } from './libs/sleep';

const extension = async () => {
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

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "twicode" is now active!');

  let disposable = vscode.commands.registerCommand('extension.changeName', async () => {

    while (true) {
      await extension();
      await sleep(10000);
    }

  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
