
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ProjectRowProps {
  icon: string;
  title: string;
  description: string;
  to?: string;
  href?: string;
  tags?: string[];
  color?: string;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ icon, title, description, to, href, tags, color = "text-terminal-dim" }) => {
  const content = (
    <div className="flex items-center gap-6 p-6 w-full relative z-0">
      {/* External Link Indicator */}
      {href && (
        <div className="absolute top-3 right-3 text-terminal-dim/40">
          <i className="fas fa-external-link-alt text-xs"></i>
        </div>
      )}

      {/* Icon Section */}
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 ${color} group-hover:bg-terminal-green group-hover:text-black transition-all duration-300 shadow-sm`}>
        <i className={`${icon} text-xl`}></i>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
            <h3 className="text-lg font-bold text-white group-hover:text-terminal-green transition-colors">{title}</h3>
            <p className="text-sm text-terminal-dim leading-relaxed max-w-2xl">
                {description}
            </p>
        </div>

        {/* Tags */}
        {tags && (
            <div className="flex flex-wrap gap-2 flex-shrink-0 md:justify-end">
                {tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-semibold text-terminal-dim bg-white/5 px-2 py-1 rounded border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>
        )}
      </div>

      {/* Arrow Indicator for internal links */}
      {to && (
        <div className="hidden md:flex flex-shrink-0 text-terminal-dim opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
            <i className="fas fa-arrow-right"></i>
        </div>
      )}
    </div>
  );

  // Updated wrapper classes with lighter background (bg-[#1a1a1a]/40) to match lighter page background
  const wrapperClasses = "block glass rounded-xl mb-4 hover:border-terminal-green/30 hover:shadow-[0_0_20px_rgba(76,175,80,0.05)] transition-all duration-300 group no-underline overflow-hidden border border-white/5 bg-[#1a1a1a]/40";

  if (to) {
    return <Link to={to} className={wrapperClasses}>{content}</Link>;
  }
  
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={wrapperClasses}>{content}</a>;
  }

  return <div className={wrapperClasses}>{content}</div>;
};

const Projects: React.FC = () => {
  useEffect(() => {
    document.title = "kCn | projects";
  }, []);

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects<span className="animate-pulse text-terminal-green">_</span>
        </h2>
        <p className="text-terminal-dim max-w-2xl text-base">
          A collection of my work in self-hosting, hardware, and software development.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* Active Projects Section */}
        <section>
            <div className="text-xs font-mono uppercase tracking-widest text-terminal-dim mb-6 pl-1 border-l-2 border-terminal-green">Active Systems</div>
            
            <ProjectRow
                icon="fas fa-network-wired"
                title="Homelab"
                description="Comprehensive documentation of my infrastructure, services, and network configurations."
                href="https://homelab.kcn333.com/"
                tags={['Documentation', 'Infrastructure']}
                color="text-green-500"
            />

            <ProjectRow
                icon="fas fa-cubes"
                title="K8s Cluster"
                description="Building a high-availability Kubernetes cluster with three mini PCs for container orchestration."
                to="/projects/cluster"
                tags={['Kubernetes', 'Hardware']}
                color="text-blue-300"
            />

            <ProjectRow
                icon="fas fa-server"
                title="Home Server"
                description="Custom home server build based on a low-power thin client with storage modifications."
                to="/projects/home-server"
                tags={['Hardware', 'Modding', 'Server']}
                color="text-gray-200"
            />

            <ProjectRow
                icon="fas fa-code"
                title="Development"
                description="Various software projects and applications, primarily developed in Java."
                href="https://github.com/kCn3333"
                tags={['Java', 'App', 'Dev']}
                color="text-orange-400"
            />

            <ProjectRow
                icon="fab fa-docker"
                title="Docker Compose"
                description="A collection of configuration files for self-hosted services running on my server."
                href="https://github.com/kCn3333/docker-compose"
                tags={['YAML', 'Docker']}
                color="text-blue-500"
            />

            <ProjectRow
                icon="fab fa-linux"
                title="Linux Bash"
                description="Some console customization, bash scritps, and configs."
                to="/projects/linux"
                tags={['Bash', 'Starship']}
                color="text-yellow-400"
            />
        </section>

        {/* Archive Section */}
        <section>
            <div className="text-xs font-mono uppercase tracking-widest text-terminal-dim mb-6 pl-1 border-l-2 border-slate-600">Archive</div>
            
            <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                <ProjectRow
                    icon="fas fa-graduation-cap"
                    title="Study Projects"
                    description="Archive of programming assignments and projects from my university studies."
                    href="https://github.com/kCn3333/studia"
                    tags={['C++', 'Java', 'Study']}
                    color="text-gray-400"
                />

                <ProjectRow
                    icon="fas fa-cogs"
                    title="Mining Rig"
                    description="A retrospective on my cryptocurrency miner build based on the Scrypt algorithm."
                    to="/projects/mining-rig"
                    tags={['Crypto', 'History']}
                    color="text-gray-400"
                />

                <ProjectRow
                    icon="fas fa-tachometer-alt"
                    title="Overclocking"
                    description="Pushing hardware to its limits: CPU delidding, water cooling, and voltage tuning."
                    to="/projects/overclocking"
                    tags={['OC', 'Cooling']}
                    color="text-gray-400"
                />

            </div>
        </section>

      </div>
    </div>
  );
};

export default Projects;