import React from 'react';
import { Link } from 'react-router-dom';

// Helper component for content layout
const ProjectLayout: React.FC<{
  title: string;
  category?: string;
  children: React.ReactNode;
}> = ({ title, category = "Project", children }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <Link to="/projects" className="inline-flex items-center text-sm text-terminal-dim hover:text-white mb-4 transition-colors">
            <i className="fas fa-arrow-left mr-2"></i> Back to Projects
        </Link>
        <div className="text-terminal-green text-sm font-mono tracking-wider uppercase mb-2">{category}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
      </div>
      <div className="space-y-6 text-terminal-text/90 leading-relaxed text-lg font-light">
        {children}
      </div>
    </div>
  );
};

// Helper for image sections - Updated with lighter background style
const ImageBox: React.FC<{
  children: React.ReactNode;
  caption?: string;
}> = ({ children, caption }) => (
  <div className="my-10">
    <div className="bg-[#1a1a1a]/40 backdrop-blur-md border border-white/5 rounded-xl p-2 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-4 bg-black/20 rounded-lg p-4">
        {children}
        </div>
    </div>
    {caption && (
        <div className="mt-3 text-center text-sm text-terminal-dim font-mono">
            {caption}
        </div>
    )}
  </div>
);

// --- Kubernetes Cluster ---
export const KubernetesProject: React.FC = () => {
  return (
    <ProjectLayout title="Kubernetes Cluster" category="Infrastructure">
      <p>
        After getting the hang of Docker, the next logical step was diving into 
        <span className="text-white font-medium"> Kubernetes</span>. At first, it seemed like an impossibly complex beast. 
        But after spending quality time with minikube, I wanted more: a real cluster, not just a single-node playground.
      </p>

      <div className="border-l-2 border-terminal-green pl-6 py-2 my-6 italic text-terminal-dim">
        "Why deploy manually when you can let Git do the work?"
      </div>

      <p>
        My priorities were compact design, low power consumption, fanless operation, and expandability.
        I settled on three <span className="text-white font-medium">HP T630 thin clients</span>. Three is the 
        minimum number of nodes needed for high availability and proper quorum in Kubernetes.
      </p>

      <ImageBox caption="Cluster Hardware Specs">
        <div className="flex flex-col md:flex-row gap-8 items-center w-full">
            <img 
                src="https://picsum.photos/600/300?grayscale" 
                alt="Three HP T630 thin clients" 
                className="rounded-lg shadow-lg max-w-full md:max-w-sm hover:scale-[1.02] transition-transform duration-500" 
            />
            <div className="flex-grow space-y-2 font-mono text-sm bg-white/5 p-6 rounded-lg w-full">
                <div className="text-terminal-green mb-4 font-bold uppercase tracking-wider">HP T630 Specs</div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span>CPU</span> <span>AMD GX-420GI (4C/4T)</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span>Clock</span> <span>Burst 2.2 GHz</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span>TDP</span> <span>15 W</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span>RAM</span> <span>8GB</span></div>
                <div className="flex justify-between"><span>SSD</span> <span>128GB</span></div>
            </div>
        </div>
      </ImageBox>

      <p>
        To make sure my nodes were comfortable, they needed a proper home. I picked up 
        a small Lanberg WF10-2312-10B 10" 12U rack cabinet – compact but surprisingly spacious.
      </p>

      <ImageBox caption="Completed Rack Setup">
        <img 
            src="https://picsum.photos/400/500?grayscale" 
            alt="HP T630 cluster mounted in rack cabinet" 
            className="rounded-lg shadow-2xl max-w-full hover:scale-[1.02] transition-transform duration-500"
        />
      </ImageBox>

      <p>
        The goal is simple: learn, experiment, and test everything from deployment to full orchestration. 
        Starting with k3s on Ubuntu and eventually working my way up to a production-grade cluster on Talos, 
        with full GitOps workflow using tools like ArgoCD or Flux.
      </p>
    </ProjectLayout>
  );
};

// --- Home Server ---
export const HomeServerProject: React.FC = () => {
  return (
    <ProjectLayout title="Home Server" category="Hardware">
      <p>
        One day, I decided to set up my own server to host some services. At first, it was just supposed
        to handle a web server, my own DNS with an ad blocker, and Samba shares. But as time went on, I ended up
        adding a lot more to it.
      </p>
      
      <p>
        My main priorities were: reasonable cost, low power consumption, and silent operation.
        I settled on a <span className="text-white font-medium">Dell Wyse 5070</span> thin client.
      </p>

      <ImageBox caption="Dell Wyse 5070 Base Unit">
        <img src="https://picsum.photos/500/300?grayscale" alt="Dell Wyse 5070 thin client" className="rounded-lg shadow-lg max-w-full hover:scale-[1.02] transition-transform duration-500" />
      </ImageBox>

      <p>
        Originally, it came with a passively cooled Intel Pentium Silver J5005 processor. I swapped out the RAM for 2x SK Hynix 8GB DDR4
        2666MHz SODIMM sticks and replaced the storage with a 256GB Intel SSD.
      </p>
      
      <h3 className="text-2xl text-white font-bold mt-8 mb-4">Storage Modifications</h3>
      <p>To solve the storage connectivity issue, I used a custom combination of adapters:</p>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        {[
            { title: "M.2 Adapter", desc: "A+E key to 2x SATA 3.0" },
            { title: "Power Mod", desc: "19-pin to 9-pin USB + SATA Power" },
            { title: "Cabling", desc: "Custom angled SATA cables" }
        ].map((item, i) => (
            <div key={i} className="glass p-6 rounded-xl text-center">
                <div className="text-terminal-green font-bold mb-2">{item.title}</div>
                <div className="w-full aspect-video bg-black/40 rounded-lg mb-3 overflow-hidden">
                     <img src={`https://picsum.photos/300/200?random=${i}&grayscale`} alt={item.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="text-sm text-terminal-dim">{item.desc}</div>
            </div>
        ))}
      </div>

      <p>
        This configuration allowed me to connect and power two 2.5-inch 1TB SATA disks. 
        They utilize minimal power (0.5A) and remain nearly silent at 5400 RPM.
      </p>

      <ImageBox caption="Final Assembly with Drive Cage">
         <img src="https://picsum.photos/500/400?grayscale" alt="Final Server" className="rounded-lg shadow-lg max-w-full hover:scale-[1.02] transition-transform duration-500" />
      </ImageBox>
    </ProjectLayout>
  );
};

// --- Linux ---
export const LinuxProject: React.FC = () => {
  return (
    <ProjectLayout title="Linux Configuration" category="Software">
      <p>
        Linux operating systems blow me away with their flexibility. The open-source nature means there's a huge community to learn from.
        Here are the key tools in my daily workflow:
      </p>

      <div className="space-y-8 mt-8">
        
        {/* Starship */}
        <div className="glass p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-grow">
                <h3 className="text-2xl text-white font-bold mb-2">Starship Prompt</h3>
                <p className="text-terminal-dim mb-4">A fast, highly customizable cross-shell prompt.</p>
                <a href="https://github.com/kCn3333/starship-config" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                    View Configuration &rarr;
                </a>
            </div>
            <img src="https://picsum.photos/600/200?grayscale" alt="Starship prompt" className="rounded-lg border border-white/10 w-full md:w-1/2" />
        </div>

        {/* Bash */}
        <div className="glass p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start">
             <div className="flex-grow">
                <h3 className="text-2xl text-white font-bold mb-2">Bash Scripts</h3>
                <p className="text-terminal-dim mb-4">Automation scripts and environment variables for system administration.</p>
                <a href="https://github.com/kCn3333/linux-bash" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                    View .bashrc &rarr;
                </a>
            </div>
            <img src="https://picsum.photos/600/200?grayscale" alt="Bash config" className="rounded-lg border border-white/10 w-full md:w-1/2" />
        </div>

        {/* Conky */}
        <div className="glass p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start">
             <div className="flex-grow">
                <h3 className="text-2xl text-white font-bold mb-2">Conky</h3>
                <p className="text-terminal-dim mb-4">Lightweight system monitor for X.</p>
                <a href="https://github.com/kCn3333/linux-conky" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">
                    View conky.conf &rarr;
                </a>
            </div>
            <img src="https://picsum.photos/300/400?grayscale" alt="Conky" className="rounded-lg border border-white/10 h-48 w-auto" />
        </div>

      </div>
    </ProjectLayout>
  );
};

// --- Mining Rig ---
export const MiningRigProject: React.FC = () => {
  return (
    <ProjectLayout title="Mining Rig (2014)" category="Archive">
      <p>
        Around late 2013, I built a mining rig for Scrypt-based coins like Litecoin or Dogecoin.
        I used existing parts, swapped the PSU, and bought three GPUs.
      </p>

      <div className="grid md:grid-cols-2 gap-8 my-10">
          <div className="glass p-6 rounded-xl">
             <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Hardware Manifest</h3>
             <ul className="space-y-3 font-mono text-sm text-terminal-dim">
                <li className="flex justify-between"><span>Motherboard</span> <span className="text-white">ASUS P5K PRO</span></li>
                <li className="flex justify-between"><span>GPU</span> <span className="text-white">3x Radeon R9 270X</span></li>
                <li className="flex justify-between"><span>PSU</span> <span className="text-white">OCZ ZT 750W</span></li>
                <li className="flex justify-between"><span>Hashrate</span> <span className="text-white">~1500 kH/s</span></li>
             </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
             <img src="https://picsum.photos/500/350?grayscale" alt="Mining Rig" className="w-full h-full object-cover" />
          </div>
      </div>

      <p className="mb-6">To handle heat and noise next to my desk, I employed some hardware mods:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
            <div className="text-terminal-green font-bold mb-2 text-lg">PCIe Shorting</div>
            <p className="text-sm text-terminal-dim mb-4">Shorting pins to connect the graphics card to the PCIe x1 slot without a riser.</p>
            <div className="flex gap-4">
                <img src="https://picsum.photos/100/100?grayscale" alt="Pins" className="rounded bg-black" />
            </div>
        </div>

        <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
            <div className="text-terminal-green font-bold mb-2 text-lg">Dummy Plug</div>
            <p className="text-sm text-terminal-dim mb-4">A hardware dummy plug to simulate a connected monitor, preventing GPU suspension.</p>
            <img src="https://picsum.photos/100/100?grayscale" alt="Dummy Plug" className="rounded bg-black" />
        </div>
      </div>

      <p className="mt-8 text-terminal-dim italic">
        Over that year, I managed to mine almost 3 Bitcoins. If I had kept them until today... well, you know the story.
      </p>
    </ProjectLayout>
  );
};

// --- Overclocking ---
export const OverclockingProject: React.FC = () => {
  return (
    <ProjectLayout title="Overclocking History" category="Archive">
      <p>
        I decided to push components to their limits to get the most performance out of them.
        Finding the right settings, ensuring adequate cooling, and stability testing was a great adventure.
      </p>

      <div className="mt-12 space-y-12">
          
          <div className="relative pl-8 md:pl-0">
             <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -ml-[0.5px]"></div>
             
             {/* Item 1 */}
             <div className="flex flex-col md:flex-row items-center gap-8 group">
                 <div className="md:w-1/2 md:text-right">
                    <h3 className="text-2xl text-white font-bold">Intel i5 2500k</h3>
                    <div className="text-terminal-green font-mono mb-2">Sandy Bridge</div>
                    <p className="text-terminal-dim text-sm">MSI BigBang + Custom Water Loop</p>
                    <div className="mt-2 inline-block bg-terminal-green/20 text-terminal-green px-3 py-1 rounded font-mono text-sm">
                        5.2 GHz @ 1.4V
                    </div>
                 </div>
                 <div className="hidden md:block w-4 h-4 rounded-full bg-terminal-green z-10 shadow-[0_0_10px_#4CAF50]"></div>
                 <div className="md:w-1/2">
                    <img src="https://picsum.photos/250/150?grayscale" alt="CPUZ" className="rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                 </div>
             </div>

             {/* Item 2 */}
             <div className="flex flex-col md:flex-row-reverse items-center gap-8 mt-12 group">
                 <div className="md:w-1/2">
                    <h3 className="text-2xl text-white font-bold">Core 2 Duo 8200</h3>
                    <div className="text-terminal-green font-mono mb-2">Wolfdale</div>
                    <p className="text-terminal-dim text-sm">Asus P5K Pro + Noctua NH-U12</p>
                    <div className="mt-2 inline-block bg-white/10 text-white px-3 py-1 rounded font-mono text-sm">
                        4.0 GHz @ 1.4V
                    </div>
                 </div>
                 <div className="hidden md:block w-3 h-3 rounded-full bg-white/30 z-10"></div>
                 <div className="md:w-1/2 md:text-right">
                    <img src="https://picsum.photos/250/150?grayscale" alt="OC 1" className="rounded-lg opacity-80 group-hover:opacity-100 transition-opacity ml-auto" />
                 </div>
             </div>
             
             {/* Item 3 */}
             <div className="flex flex-col md:flex-row items-center gap-8 mt-12 group">
                 <div className="md:w-1/2 md:text-right">
                    <h3 className="text-2xl text-white font-bold">Athlon XP 1800+</h3>
                    <div className="text-terminal-green font-mono mb-2">Thoroughbred</div>
                    <p className="text-terminal-dim text-sm">DFI DFII Ultra Infinity + Zalman 7000B</p>
                    <div className="mt-2 inline-block bg-white/10 text-white px-3 py-1 rounded font-mono text-sm">
                        2355 MHz
                    </div>
                 </div>
                 <div className="hidden md:block w-3 h-3 rounded-full bg-white/30 z-10"></div>
                 <div className="md:w-1/2">
                    {/* Placeholder for visuals */}
                    <div className="w-[250px] h-[150px] bg-white/5 rounded-lg border border-white/5"></div>
                 </div>
             </div>

          </div>

      </div>
    </ProjectLayout>
  );
};