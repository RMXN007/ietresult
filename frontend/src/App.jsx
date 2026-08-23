import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/context/ThemeContext';
import Starfield from './components/background/Starfield';

function App() {
  return (
    <ThemeProvider>
      <Starfield />
      <Router>
        <div className="min-h-screen font-sans bg-[#f8fafc] dark:bg-transparent transition-colors duration-300 relative z-10 overflow-hidden">
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
