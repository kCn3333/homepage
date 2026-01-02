
import React, { useState, useEffect, useContext } from 'react';
import { TerminalContext } from '../components/Layout';

const TypewriterTerminal: React.FC = () => {
  const { setTerminalComplete } = useContext(TerminalContext);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [script, setScript] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data and Prepare Script
  useEffect(() => {
    const fetchData = async () => {
      let ip = "unknown";
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        if (data.ip) ip = data.ip;
      } catch (e) {
        try {
          const res2 = await fetch('https://api.seeip.org/jsonip');
          const data2 = await res2.json();
          if (data2.ip) ip = data2.ip;
          else ip = "hidden";
        } catch (e2) {
          ip = "hidden";
        }
      }

      const userAgent = navigator.userAgent;
      const resolution = `${window.screen.width}x${window.screen.height}`;
      const language = navigator.language;

      const newScript = [
        { text: "user@kCn-homepage:~$ ./visitor_info.sh", type: 'command' },
        { text: "Initializing scan...", type: 'output', delay: 300 },
        { text: `User Agent: ${userAgent}`, type: 'output', delay: 100 },
        { text: `Display: ${resolution}`, type: 'output', delay: 100 },
        { text: `Language: ${language}`, type: 'output', delay: 100 },
        { text: `IP Address: ${ip}`, type: 'output', delay: 200 },
        { text: "Scan complete. Welcome.", type: 'output', delay: 100 },
        { text: "user@kCn-homepage:~$", type: 'prompt', delay: 200 }
      ];

      setScript(newScript);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing logic
  useEffect(() => {
    if (loading || script.length === 0) return;

    if (currentLineIndex >= script.length) {
      setTerminalComplete(true);
      return;
    }

    const currentItem = script[currentLineIndex];
    
    // If it's a command, type it out
    if (currentItem.type === 'command') {
      if (charIndex < currentItem.text.length) {
        const timeout = setTimeout(() => {
          setLines(prev => {
             const newLines = [...prev];
             // Initialize line if needed
             if (newLines[currentLineIndex] === undefined) {
                 newLines[currentLineIndex] = "";
             }
             // Be safe with undefined during async updates
             const safePrevLine = newLines[currentLineIndex] || "";
             // Only append if we match the expected char index to avoid race conditions
             if (safePrevLine.length === charIndex) {
                newLines[currentLineIndex] = currentItem.text.substring(0, charIndex + 1);
             }
             return newLines;
          });
          setCharIndex(prev => prev + 1);
        }, 30 + Math.random() * 40); 
        return () => clearTimeout(timeout);
      } else {
        // Command finished typing, move to next line after pause
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } 
    // If output or final prompt, show immediately after delay
    else {
      const timeout = setTimeout(() => {
         setLines(prev => [...prev, currentItem.text]);
         setCurrentLineIndex(prev => prev + 1);
      }, currentItem.delay || 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, charIndex, script, loading, setTerminalComplete]);

  // Initial setup for empty first line
  useEffect(() => {
      if (!loading && lines.length === 0) {
          setLines(['']);
      }
  }, [loading]);

  if (loading) return null;

  return (
    <div className="glass w-full rounded-xl overflow-hidden font-mono text-xs md:text-sm border border-terminal-border bg-[#0a0a0a]/90 shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5 h-8">
        <div className="text-terminal-dim opacity-50">sh - 80x24</div>
        <div className="text-terminal-dim font-semibold">kCn@web:~</div>
        <div className="w-4"></div> {/* Spacer for balance */}
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 min-h-[250px] flex flex-col justify-end">
        {lines.map((line, i) => {
           // Determine color based on content content
           let className = "text-terminal-dim";
           if (line.startsWith("user@")) className = "text-terminal-green";
           if (line.startsWith("User Agent:")) className = "text-blue-300";
           if (line.startsWith("IP Address:")) className = "text-blue-300";
           if (line.startsWith("Scan complete")) className = "text-white";
           
           // Render cursor on the last active line
           const isLastLine = i === lines.length - 1;
           
           return (
             <div key={i} className={`${className} mb-1 break-all leading-relaxed`}>
               {line}
               {isLastLine && showCursor && <span className="inline-block w-2 h-4 bg-terminal-green ml-1 align-middle"></span>}
             </div>
           );
        })}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
    useEffect(() => {
    document.title = "kCn | home page";
  }, []);

  return (
    <div className="flex flex-col gap-20 relative">
        
      {/* Open Hero Section */}
      <section className="flex flex-col justify-center min-h-[35vh]">
        <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-terminal-green/20 bg-terminal-green/5 text-terminal-green text-xs font-mono tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-terminal-green mr-2 animate-pulse"></span>
                SYSTEM_READY
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Hello and welcome, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-green to-emerald-300">
                    kCn
                </span>
            </h2>
            
            <p className="text-lg md:text-xl text-terminal-dim max-w-2xl font-light leading-relaxed">
                A computer enthusiast & hardware tinkerer exploring the boundaries of 
                <br />
                <span className="text-white font-normal mx-1">self-hosting</span> 
                <span className="text-white font-normal mx-1">development</span> and 
                <span className="text-white font-normal mx-1">infrastructure</span>
            </p>
            <div className="border-l-2 border-terminal-green pl-6 py-2 my-6 italic text-terminal-dim">
            It's black because we're all fans of dark mode.
            </div>
        </div>
      </section>

      {/* Animated Terminal Section */}
      <div className="w-full max-w-4xl ml-auto mb-12">
          <TypewriterTerminal />
      </div>

    </div>
  );
};

export default Home;