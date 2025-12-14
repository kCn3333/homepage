import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import { 
  KubernetesProject, 
  HomeServerProject, 
  LinuxProject, 
  MiningRigProject, 
  OverclockingProject 
} from './pages/ProjectContent';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* Project Details Routes */}
          <Route path="/projects/cluster" element={<KubernetesProject />} />
          <Route path="/projects/home-server" element={<HomeServerProject />} />
          <Route path="/projects/linux" element={<LinuxProject />} />
          <Route path="/projects/mining-rig" element={<MiningRigProject />} />
          <Route path="/projects/overclocking" element={<OverclockingProject />} />
          
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;