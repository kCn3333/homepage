
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Helper to resolve image paths correctly on GitHub Pages
// Vite's import.meta.env.BASE_URL will be '/homepage/' in production
const img = (path: string) => {
  // Ensure we don't double slash if path starts with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${(import.meta as any).env.BASE_URL}${cleanPath}`;
};

// --- Lightbox Component ---
interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[101]"
        aria-label="Close"
      >
        <i className="fas fa-times text-3xl"></i>
      </button>

      {/* Image Container */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl select-none"
          onContextMenu={(e) => e.preventDefault()} // Disable right-click save
          draggable={false}
        />
      </div>
    </div>
  );
};

// --- Context for Image Management ---
// We use a simple wrapper to provide the modal capability to each project page
const ProjectWrapper: React.FC<{ children: (openModal: (src: string, alt: string) => void) => React.ReactNode }> = ({ children }) => {
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);

  return (
    <>
      {children((src, alt) => setModalImage({ src, alt }))}
      
      {modalImage && (
        <Lightbox 
          src={modalImage.src} 
          alt={modalImage.alt} 
          onClose={() => setModalImage(null)} 
        />
      )}
    </>
  );
};

// --- Zoomable Image Component ---
interface ZoomableImageProps {
  src: string;       // Thumbnail source (or full if no thumb)
  fullSrc?: string;  // Full resolution source
  alt: string;
  className?: string;
  openModal: (src: string, alt: string) => void;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, fullSrc, alt, className = "", openModal }) => {
  return (
    <div 
      className={`relative group cursor-zoom-in overflow-hidden rounded-lg ${className}`}
      onClick={() => openModal(fullSrc || src, alt)}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
        <i className="fas fa-expand text-white/80 text-2xl drop-shadow-md"></i>
      </div>
    </div>
  );
};

// --- Layout Helpers ---

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
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-terminal-text/90 leading-relaxed text-base font-light">
        {children}
      </div>
    </div>
  );
};

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
    <ProjectWrapper>
      {(openModal) => (
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
                <div className="w-full md:w-1/2">
                  <ZoomableImage 
                    src={img("img/cluster_img/hp1.jpg")}
                    alt="Three HP T630 thin clients" 
                    openModal={openModal}
                  />
                </div>
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
            <div className="max-w-md mx-auto">
              <ZoomableImage 
                src={img("img/cluster_img/rack1.jpg")}
                alt="HP T630 cluster mounted in rack cabinet" 
                openModal={openModal}
              />
            </div>
          </ImageBox>

          <p>
            The goal is simple: learn, experiment, and test everything from deployment to full orchestration. 
            Starting with k3s on Ubuntu and eventually working my way up to a production-grade cluster on Talos, 
            with full GitOps workflow using tools like ArgoCD or Flux.
          </p>
        </ProjectLayout>
      )}
    </ProjectWrapper>
  );
};

// --- Home Server ---
export const HomeServerProject: React.FC = () => {
  return (
    <ProjectWrapper>
      {(openModal) => (
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
            <div className="max-w-lg mx-auto">
              <ZoomableImage 
                src={img("img/server/dell.jpg")}
                alt="Dell Wyse 5070 thin client" 
                openModal={openModal}
              />
            </div>
          </ImageBox>

          <p>
            Originally, it came with a passively cooled Intel Pentium Silver J5005 processor. I swapped out the RAM for 2x SK Hynix 8GB DDR4
            2666MHz SODIMM sticks and replaced the storage with a 256GB Intel SSD.
          </p>
          
          <h3 className="text-2xl text-white font-bold mt-8 mb-4">Storage Modifications</h3>
          <p>To solve the storage connectivity issue, I used a custom combination of adapters:</p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="glass p-6 rounded-xl text-center">
                <div className="text-terminal-green font-bold mb-2">M.2 Adapter</div>
                <div className="w-full aspect-video bg-black/40 rounded-lg mb-3 overflow-hidden">
                    <ZoomableImage 
                      src={img("img/server/m2_m.jpg")}
                      fullSrc={img("img/server/m2.jpg")}
                      alt="M2 to SATA adapter card" 
                      openModal={openModal}
                      className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-sm text-terminal-dim">A+E key to 2x SATA 3.0</div>
            </div>

            <div className="glass p-6 rounded-xl text-center">
                <div className="text-terminal-green font-bold mb-2">Power Mod</div>
                <div className="w-full aspect-video bg-black/40 rounded-lg mb-3 overflow-hidden grid grid-cols-2 gap-1">
                     <ZoomableImage 
                      src={img("img/server/sata_to_usb_m.jpg")}
                      fullSrc={img("img/server/sata_to_usb.jpg")}
                      alt="19 pin USB" 
                      openModal={openModal}
                    />
                     <ZoomableImage 
                      src={img("img/server/sata_to_usb2_m.jpg")}
                      fullSrc={img("img/server/sata_to_usb2.jpg")}
                      alt="SATA Power" 
                      openModal={openModal}
                    />
                </div>
                <div className="text-sm text-terminal-dim">19-pin to 9-pin USB + SATA Power</div>
            </div>

            <div className="glass p-6 rounded-xl text-center">
                <div className="text-terminal-green font-bold mb-2">Cabling</div>
                <div className="w-full aspect-video bg-black/40 rounded-lg mb-3 overflow-hidden">
                    <ZoomableImage 
                      src={img("img/server/angle_sata_cables.jpg")}
                      alt="Angled SATA data cables" 
                      openModal={openModal}
                      className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-sm text-terminal-dim">Custom angled SATA cables</div>
            </div>
          </div>

          <p>
            This configuration allowed me to connect and power two 2.5-inch 1TB SATA disks. 
            They utilize minimal power (0.5A) and remain nearly silent at 5400 RPM.
          </p>

          <ImageBox caption="Final Assembly with Drive Cage">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <ZoomableImage 
                  src={img("img/server/server2_m.jpg")}
                  fullSrc={img("img/server/server2.jpg")}
                  alt="Server assembly process" 
                  openModal={openModal}
                />
                <ZoomableImage 
                  src={img("img/server/server_m.jpg")}
                  fullSrc={img("img/server/server.jpg")}
                  alt="Completed home server setup" 
                  openModal={openModal}
                />
             </div>
          </ImageBox>
        </ProjectLayout>
      )}
    </ProjectWrapper>
  );
};

// --- Linux ---
export const LinuxProject: React.FC = () => {
  return (
    <ProjectWrapper>
      {(openModal) => (
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
                <div className="w-full md:w-1/2">
                  <ZoomableImage 
                    src={img("img/lnx/console.jpg")}
                    alt="Starship prompt customization" 
                    openModal={openModal}
                  />
                </div>
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
                <div className="w-full md:w-1/2">
                  <ZoomableImage 
                    src={img("img/lnx/console2.jpg")}
                    alt="Bash terminal customization" 
                    openModal={openModal}
                  />
                </div>
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
                <div className="w-full md:w-auto md:max-w-xs">
                  <ZoomableImage 
                    src={img("img/lnx/conky.jpg")}
                    alt="Conky system monitor" 
                    openModal={openModal}
                  />
                </div>
            </div>

          </div>
        </ProjectLayout>
      )}
    </ProjectWrapper>
  );
};

// --- Mining Rig ---
export const MiningRigProject: React.FC = () => {
  return (
    <ProjectWrapper>
      {(openModal) => (
        <ProjectLayout title="Mining Rig (2014)" category="Archive">
          <p>
            Around late 2013, I built a mining rig for Scrypt-based coins like Litecoin or Dogecoin.
            I used existing parts, swapped the PSU, and bought three GPUs.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-10">
              <div className="glass p-6 rounded-xl flex flex-col justify-between">
                 <div>
                    <h3 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Hardware Manifest</h3>
                    <ul className="space-y-3 font-mono text-sm text-terminal-dim mb-4">
                        <li className="flex justify-between"><span>Motherboard</span> <span className="text-white">ASUS P5K PRO</span></li>
                        <li className="flex justify-between"><span>GPU</span> <span className="text-white">3x Radeon R9 270X</span></li>
                        <li className="flex justify-between"><span>PSU</span> <span className="text-white">OCZ ZT 750W</span></li>
                        <li className="flex justify-between"><span>Hashrate</span> <span className="text-white">~1500 kH/s</span></li>
                    </ul>
                 </div>
                 <div className="mt-4">
                    <ZoomableImage 
                      src={img("img/coins/cg_m.jpg")}
                      fullSrc={img("img/coins/cg.jpg")}
                      alt="CGMiner screenshot" 
                      openModal={openModal}
                      className="rounded-md border border-white/10"
                    />
                 </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-full">
                 <ZoomableImage 
                    src={img("img/coins/kopara_m.jpg")}
                    fullSrc={img("img/coins/kopara.jpg")}
                    alt="Mining rig with 3x R9 270X" 
                    openModal={openModal}
                    className="h-full w-full object-cover"
                 />
              </div>
          </div>

          <p className="mb-6">To handle heat and noise next to my desk, I employed some hardware mods:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <div className="text-terminal-green font-bold mb-2 text-lg">PCIe Shorting</div>
                <p className="text-sm text-terminal-dim mb-4">Shorting pins to connect the graphics card to the PCIe x1 slot without a riser.</p>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <ZoomableImage 
                          src={img("img/coins/pins.jpg")}
                          alt="PCIe pins" 
                          openModal={openModal}
                        />
                    </div>
                    <div className="w-1/2">
                        <ZoomableImage 
                          src={img("img/coins/pins2.jpg")}
                          alt="PCIe pins close up" 
                          openModal={openModal}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <div className="text-terminal-green font-bold mb-2 text-lg">Dummy Plug</div>
                <p className="text-sm text-terminal-dim mb-4">A hardware dummy plug to simulate a connected monitor, preventing GPU suspension.</p>
                <ZoomableImage 
                    src={img("img/coins/dummy_m.jpg")}
                    fullSrc={img("img/coins/dummyplug.jpg")}
                    alt="HDMI dummy plug" 
                    openModal={openModal}
                />
            </div>
          </div>
          
          <ImageBox caption="My setup back in 2013-2014">
             <div className="max-w-md mx-auto">
                <ZoomableImage 
                  src={img("img/coins/room_m.jpg")}
                  fullSrc={img("img/coins/room.jpg")}
                  alt="My room with mining rig" 
                  openModal={openModal}
                />
             </div>
          </ImageBox>

          <p className="mt-8 text-terminal-dim italic">
            Over that year, I managed to mine almost 3 Bitcoins. If I had kept them until today... well, you know the story.
          </p>
        </ProjectLayout>
      )}
    </ProjectWrapper>
  );
};

// --- Overclocking ---
export const OverclockingProject: React.FC = () => {
  return (
    <ProjectWrapper>
      {(openModal) => (
        <ProjectLayout title="Overclocking History" category="Archive">
          <p>
            I decided to push components to their limits to get the most performance out of them.
            Finding the right settings, ensuring adequate cooling, and stability testing was a great adventure.
          </p>

          <div className="mt-12 space-y-12">
              
              <div className="relative pl-8 md:pl-0">
                 <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -ml-[0.5px]"></div>
                 
                 {/* Item 1 - i5 2500k */}
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
                     <div className="md:w-1/2 flex gap-2">
                        <div className="w-1/2">
                          <ZoomableImage 
                             src={img("img/overclocking/5200_m.jpg")}
                             fullSrc={img("img/overclocking/5200.jpg")}
                             alt="CPU-Z 5200MHz" 
                             openModal={openModal}
                          />
                        </div>
                        <div className="w-1/2">
                          <ZoomableImage 
                             src={img("img/overclocking/wc_m.jpg")}
                             fullSrc={img("img/overclocking/wc.jpg")}
                             alt="Custom Water Cooling Loop" 
                             openModal={openModal}
                          />
                        </div>
                     </div>
                 </div>

                 {/* Item 2 - Core 2 Duo */}
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
                     <div className="md:w-1/2 md:text-right flex gap-2 justify-end">
                        <div className="w-1/3">
                          <ZoomableImage 
                             src={img("img/overclocking/3600_m.jpg")}
                             fullSrc={img("img/overclocking/3600.jpg")}
                             alt="OC 3600MHz" 
                             openModal={openModal}
                          />
                        </div>
                        <div className="w-1/3">
                          <ZoomableImage 
                             src={img("img/overclocking/4000_m.jpg")}
                             fullSrc={img("img/overclocking/4000.jpg")}
                             alt="OC 4000MHz" 
                             openModal={openModal}
                          />
                        </div>
                        <div className="w-1/3">
                          <ZoomableImage 
                             src={img("img/overclocking/4160_m.jpg")}
                             fullSrc={img("img/overclocking/4160.jpg")}
                             alt="OC 4160MHz" 
                             openModal={openModal}
                          />
                        </div>
                     </div>
                 </div>
                 
                 {/* Item 3 - Athlon XP */}
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
                     <div className="md:w-1/2 flex gap-2">
                        <div className="w-1/2">
                          <ZoomableImage 
                             src={img("img/overclocking/2355_m.jpg")}
                             fullSrc={img("img/overclocking/2355.jpg")}
                             alt="Athlon 2355MHz" 
                             openModal={openModal}
                          />
                        </div>
                        <div className="w-1/2">
                          <ZoomableImage 
                             src={img("img/overclocking/2600_m.jpg")}
                             fullSrc={img("img/overclocking/2600.jpg")}
                             alt="Athlon 2600MHz" 
                             openModal={openModal}
                          />
                        </div>
                     </div>
                 </div>

              </div>

          </div>
        </ProjectLayout>
      )}
    </ProjectWrapper>
  );
};