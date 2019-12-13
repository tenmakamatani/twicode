import * as vscode from 'vscode';

import { changeName } from './commands/changeName';

import { sleep } from './lib/sleep';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "twicode" is now active!');

  let disposable = vscode.commands.registerCommand('extension.changeName', async () => {

    while (true) {
      await changeName();
      await sleep(10000);
    }

  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
