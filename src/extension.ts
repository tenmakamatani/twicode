import * as vscode from 'vscode';

import { run } from './commands/run';
import { register } from './commands/register';

import { sleep } from './lib/sleep';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "twicode" is now active!');

  const runCommand = vscode.commands.registerCommand('twicode.run', async () => {

    while (true) {
      await run();
      await sleep(10000);
    }

  });

  const registerCommand = vscode.commands.registerCommand('twicode.register', () => {
    
    register();

  });

  context.subscriptions.push(runCommand);
  context.subscriptions.push(registerCommand);
}

export function deactivate() {}
