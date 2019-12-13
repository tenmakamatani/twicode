import * as vscode from 'vscode';

import { main } from './lib/main';
import { sleep } from './lib/sleep';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "twicode" is now active!');

  let disposable = vscode.commands.registerCommand('extension.changeName', async () => {

    while (true) {
      await main();
      await sleep(10000);
    }

  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
