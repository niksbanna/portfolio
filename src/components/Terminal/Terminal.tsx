import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from 'lucide-react';
import type { TerminalHistoryItem, TerminalOutput } from '../../types/terminal';
import { getWelcomeMessage, executeCommand } from './commands';

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [welcomeShown, setWelcomeShown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !welcomeShown) {
      setHistory([{ input: '', output: getWelcomeMessage() }]);
      setWelcomeShown(true);
    }
  }, [isOpen, welcomeShown]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = () => {
    const trimmed = currentInput.trim();

    if (trimmed === 'clear') {
      setHistory([]);
      setCurrentInput('');
      return;
    }

    const output = executeCommand(currentInput);

    if (trimmed) {
      setCommandHistory((prev) => [...prev.filter((cmd) => cmd !== trimmed), trimmed]);
      setHistoryIndex(-1);
    }

    setHistory((prev) => [...prev, { input: currentInput, output }]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'about', 'skills', 'projects', 'contact', 'social', 'experience', 'clear', 'theme'];
      const match = commands.find((cmd) => cmd.startsWith(currentInput.toLowerCase()));
      if (match) {
        setCurrentInput(match);
      }
    }
  };

  const renderOutput = (output: TerminalOutput, index: number) => {
    const colors = {
      text: 'text-gray-300',
      error: 'text-red-400',
      success: 'text-green-400',
      info: 'text-blue-400',
      ascii: 'text-green-400 font-bold',
    };

    return (
      <div key={index} className={`${colors[output.type]} whitespace-pre-wrap`}>
        {output.content}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all hover:scale-105"
      >
        <TerminalIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Open Terminal</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden transition-all duration-200 ${
        isMinimized
          ? 'bottom-6 right-6 w-64 h-10'
          : 'bottom-6 right-6 w-[90vw] max-w-2xl h-[60vh] max-h-[500px]'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-green-400" />
          <span className="text-sm text-gray-300 font-mono">narendra@portfolio ~ $</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4 text-gray-400" />
            ) : (
              <Minimize2 className="h-4 w-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsMinimized(false);
            }}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div
          ref={terminalRef}
          className="h-[calc(100%-40px)] overflow-y-auto p-4 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, historyIdx) => (
            <div key={historyIdx} className="mb-2">
              {item.input && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-green-400">$</span>
                  <span>{item.input}</span>
                </div>
              )}
              <div className="ml-4">{item.output.map((out, outIdx) => renderOutput(out, outIdx))}</div>
            </div>
          ))}

          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none caret-green-400"
              spellCheck={false}
              autoComplete="off"
              placeholder="Type a command..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
