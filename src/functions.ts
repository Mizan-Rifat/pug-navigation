import * as vscode from 'vscode';

export const goToDefinationFile = async () => {
  const editor = vscode.window.activeTextEditor;
  const regex = /^\s*(extends|include)\s+([-./a-zA-Z\d_]+)$/g;
  const lineText = editor?.document.lineAt(editor.selection.active.line)?.text || '';

  const isImportStatement = regex.test(lineText);

  if (isImportStatement) {
    const targetFileRelativePath = lineText!.replace(' ./', ' ').split(' ').slice(-1)[0];
    const currentFilePath = editor!.document.uri.path;

    const upperPathCount = targetFileRelativePath.split('../').length - 1;
    const targetFileFolderPath = targetFileRelativePath.split('../').slice(-1)[0];

    const mainDir =
      currentFilePath
        .split('/')
        .slice(0, -Math.abs(upperPathCount + 1))
        .join('/')
        .replace('/', '') + '/';

    let targetFilePath = mainDir + targetFileFolderPath;
    // check if the file ends with .pug if not add it
    if (!targetFilePath.endsWith('.pug')) {
      targetFilePath += '.pug';
    }

    vscode.workspace.openTextDocument(targetFilePath).then(document => {
      vscode.window.showTextDocument(document);
    });
  }
};

export const goToMixinFile = async () => {
  const editor = vscode.window.activeTextEditor;
  const selectedText = editor?.document.getText(editor.selection) || '';

  if (selectedText) {
    const fileUris = await vscode.workspace.findFiles('**/*.pug');

    let file: string = '';
    let lineNumber: null | number = null;

    for (const fileUri of fileUris) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      const contentString = document.getText();

      const regex = new RegExp(`(mixin)\\s+${selectedText}`, 'gi');

      if (regex.test(contentString)) {
        file = fileUri.fsPath;
        const wordPattern = new RegExp(`\\b(mixin)\\s+${selectedText}\\b`, 'gi');
        const match = wordPattern.exec(contentString);

        if (match) {
          const matchOffset = match.index;
          const position = document.positionAt(matchOffset);
          lineNumber = position.line + 1;
        }
        break;
      }
    }

    if (file) {
      try {
        const document = await vscode.workspace.openTextDocument(file);
        const editor = await vscode.window.showTextDocument(document);

        if (lineNumber) {
          const position = new vscode.Position(lineNumber - 1, 0);
          editor.selection = new vscode.Selection(position, position);
          editor.revealRange(editor.selection, vscode.TextEditorRevealType.InCenter);
        }
      } catch (error) {
        console.error(`Error opening file: ${error}`);
      }
    } else {
      vscode.window.showInformationMessage('No matches found in the workspace.');
    }
  }
  return;
};
