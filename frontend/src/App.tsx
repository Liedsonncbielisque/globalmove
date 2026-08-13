import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import Compare from './pages/Compare';
import Simulator from './pages/Simulator';
import Goals from './pages/Goals';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AIAssistant from './pages/AIAssistant';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="destinos" element={<Countries />} />
        <Route path="destinos/:countryId" element={<CountryDetail />} />
        <Route path="comparar" element={<Compare />} />
        <Route path="simulador" element={<Simulator />} />
        <Route path="metas" element={<Goals />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="ai" element={<AIAssistant />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;