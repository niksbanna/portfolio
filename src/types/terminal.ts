export interface TerminalOutput {
  type: 'text' | 'error' | 'success' | 'info' | 'ascii';
  content: string;
}

export interface TerminalHistoryItem {
  input: string;
  output: TerminalOutput[];
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => TerminalOutput[];
}
