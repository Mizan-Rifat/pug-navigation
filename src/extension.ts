import * as vscode from 'vscode';
import { goToDefinationFile, goToMixinFile } from './functions';

export function activate(context: vscode.ExtensionContext) {
  console.log('Pug Navigation is now active!');

  let hoverProvider = vscode.languages.registerHoverProvider('jade', {
    provideHover(document) {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const lineText = document.lineAt(editor.selection.active.line)?.text || '';
        const regex = /^(extends|include)\s+([-./a-zA-Z\d]+)$/g;
        const isImportStatement = regex.test(lineText);
        if (editor && isImportStatement) {
          return new vscode.Hover(`Click ctrl+o to go to the defination`);
        } else {
          return null;
        }
      }
      return undefined;
    }
  });

  let disposable = vscode.commands.registerCommand('pug-navigation.pug-navigation', () => {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Loading...',
        cancellable: false
      },
      () => {
        return Promise.allSettled([goToDefinationFile(), goToMixinFile()]);
      }
    );
  });

  context.subscriptions.push(disposable, hoverProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
