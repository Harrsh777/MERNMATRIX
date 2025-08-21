'use client';

import React, { useEffect, useRef, useState } from 'react';

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const terminalLines = [
    { text: '$ npm install mern-stack-club', delay: 500 },
    { text: 'Installing MERN Stack Club...', delay: 1000 },
    { text: '✓ MongoDB configured', delay: 300 },
    { text: '✓ Express.js server ready', delay: 300 },
    { text: '✓ React frontend loaded', delay: 300 },
    { text: '✓ Node.js runtime active', delay: 300 },
    { text: '', delay: 500 },
    { text: '$ git clone https://github.com/mern-club/starter', delay: 800 },
    { text: 'Cloning repository...', delay: 600 },
    { text: '✓ Repository cloned successfully', delay: 300 },
    { text: '', delay: 500 },
    { text: '$ cd mern-stack-club', delay: 400 },
    { text: '$ npm run dev', delay: 600 },
    { text: 'Starting development server...', delay: 800 },
    { text: '✓ Server running on http://localhost:3000', delay: 300 },
    { text: '✓ Hot reload enabled', delay: 200 },
    { text: '✓ Database connected', delay: 200 },
    { text: '', delay: 500 },
    { text: '🚀 Welcome to MERN Stack Club!', delay: 1000 },
    { text: 'Ready to build amazing applications...', delay: 800 },
    { text: '', delay: 1000 },
    { text: '$ _', delay: 0 }
  ];

  useEffect(() => {
    if (!terminalRef.current) return;

    const typeLine = (lineIndex: number) => {
      if (lineIndex >= terminalLines.length) {
        // Restart the animation
        setTimeout(() => {
          setCurrentLine(0);
          setIsTyping(false);
        }, 3000);
        return;
      }

      setIsTyping(true);
      const line = terminalLines[lineIndex];
      
      setTimeout(() => {
        setCurrentLine(lineIndex + 1);
        setIsTyping(false);
      }, line.delay + (line.text.length * 30)); // 30ms per character
    };

    const timer = setTimeout(() => {
      typeLine(currentLine);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentLine]);

  return (
    <div className="w-full h-[400px] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400 font-mono">terminal — bash — 80×24</div>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="p-4 h-full overflow-hidden font-mono text-sm"
      >
        <div className="space-y-1">
          {terminalLines.slice(0, currentLine).map((line, index) => (
            <div key={index} className="text-green-400">
              {line.text}
            </div>
          ))}
          {isTyping && currentLine < terminalLines.length && (
            <div className="text-green-400">
              {terminalLines[currentLine].text}
              <span className="animate-pulse">█</span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default Terminal;