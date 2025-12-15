
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
        <p className="text-terminal-green font-mono">kCn / Computer Enthusiast</p>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          
        {/* Main Text */}
        <div className="space-y-6 text-terminal-text/80 leading-relaxed text-base font-light">
            <p>
                Hi, I'm <span className="text-white font-medium">kCn</span>. Just another computer enthusiast.
            </p>
            <p>
                I've always been into technology and everything that comes along with it. <br /> 
                As a child, I used to take apart radios and televisions just to figure out what was going on inside and how they worked.
            </p>
            <p>
                I put together my first computer when I was 12. When its performance started falling behind my needs, I got into overclocking. This journey saw me burn through a few power supplies and motherboards along the way.
            </p>
            <p>
                In high school and during my studies, I picked up programming in C++ and Java. Along the way, I came across Linux and got hooked on self-hosting, system administration, online privacy, and security.
            </p>

            <div className="pt-8">
                <h3 className="text-white font-bold mb-6 text-xl">Current Interests</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-terminal-dim hover:text-white transition-colors">
                        <i className="fas fa-server text-terminal-green text-sm w-5 text-center"></i>
                        <span>Self-hosting</span>
                    </div>
                    <div className="flex items-center gap-3 text-terminal-dim hover:text-white transition-colors">
                        <i className="fas fa-chess-rook text-terminal-green text-sm w-5 text-center"></i>
                        <span>History</span>
                    </div>
                    <div className="flex items-center gap-3 text-terminal-dim hover:text-white transition-colors">
                        <i className="fas fa-terminal text-terminal-green text-sm w-5 text-center"></i>
                        <span>Development</span>
                    </div>
                    <div className="flex items-center gap-3 text-terminal-dim hover:text-white transition-colors">
                        <i className="fas fa-atom text-terminal-green text-sm w-5 text-center"></i>
                        <span>Quantum Physics</span>
                    </div>
                    <div className="flex items-center gap-3 text-terminal-dim hover:text-white transition-colors">
                        <i className="fas fa-robot text-terminal-green text-sm w-5 text-center"></i>
                        <span>AI & LLMs</span>
                    </div>
                    <div className="flex items-center gap-3 text-terminal-dim hover:text-white transition-colors">
                        <i className="fas fa-utensils text-terminal-green text-sm w-5 text-center"></i>
                        <span>Cooking</span>
                    </div>

                </div>
            </div>
        </div>

        {/* Contact Column */}
        <div className="space-y-6">
            {/* Lighter glass background for contact card */}
            <div className="bg-[#1a1a1a]/40 backdrop-blur-md border border-white/5 p-6 rounded-xl">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                    Connect
                </h3>
                
                <ul className="space-y-4">
                    <li>
                        <a href="mailto:cnk333@email.cz" className="flex items-center gap-4 text-terminal-dim hover:text-white transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-terminal-green group-hover:text-black transition-colors">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider opacity-50">Email</span>
                                <span className="font-mono text-sm">cnk333@email.cz</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://discord.com/users/1314708812120330333" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-terminal-dim hover:text-white transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-terminal-green group-hover:text-black transition-colors">
                                <i className="fab fa-discord"></i>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider opacity-50">Discord</span>
                                <span className="font-mono text-sm">@kCn3333</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/kCn3333" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-terminal-dim hover:text-white transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-terminal-green group-hover:text-black transition-colors">
                                <i className="fab fa-github"></i>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider opacity-50">GitHub</span>
                                <span className="font-mono text-sm">github.com/kCn3333</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;