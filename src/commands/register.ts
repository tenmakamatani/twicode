import * as vscode from 'vscode';
import { open as openUrl } from 'openurl';

export const register = async () => {

  const firstMessage = 'You have to setup twitter application. Would you like to continue?';
  const leadToAppMessage = 'First, you have to go https://apps.twitter.com and create twitter application.';
  const createAppMessage = 'Make sure you have created a new Twitter app and configured the app keys and tokens. Would you like to configure them now?';
  const createSettingsMessage = 'Type those four keys in workspace settings.(search "twitter" in settings)';
  const finalMessage = 'Then you can use twicode! Type command "Run"';

  const twitterNewAppUrl = 'https://apps.twitter.com/app/new';


  await vscode.window.showInformationMessage(
    firstMessage, 
    "Continue"
  );

  await vscode.window.showInformationMessage(
    leadToAppMessage,
    "Continue"
  );
  openUrl(twitterNewAppUrl);

  await vscode.window.showInformationMessage(
    createAppMessage,
    "Yes"
  );
  
  vscode.commands.executeCommand('workbench.action.openGlobalSettings');
  await vscode.window.showInformationMessage(
    createSettingsMessage,
    "Done"
  );

  await vscode.window.showInformationMessage(
    finalMessage,
    "OK!"
  );
};