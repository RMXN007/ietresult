import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { fetchWithRetry } from '../utils/api';
import ietLogo from '../assets/IET-DAVV-Logo.webp';

const API_URL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

export default function Home() {
  const [rollno, setRollno] = useState('');
  const [type, setType] = useState('Regular');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Fetching result...");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;
    const timer1 = setTimeout(() => setLoadingMessage("Connecting to server..."), 2000);
    const timer2 = setTimeout(() => setLoadingMessage("Server is waking up, please wait..."), 5000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setLoadingMessage("Fetching result...");
    };
  }, [loading]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!rollno || rollno.trim() === '') {
      setError('Please enter a valid Roll Number.');
      return;
    }

    setLoading(true);

    const result = await fetchWithRetry(
      `${API_URL}/api/result`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollno: rollno.trim(), type })
      },
      3,
      4000
    );

    setLoading(false);

    if (result.success) {
      navigate('/result', { state: { resultData: result.data } });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md relative animate-fade-in-up">
        {/* Glow effect only in dark mode */}
        <div className="hidden dark:block absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-30"></div>

        <div className="relative bg-white dark:bg-white/10 dark:backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden p-8 transition-all duration-300">

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src={ietLogo}
                alt="IET DAVV Logo"
                className="w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-white/20 shadow-md bg-white p-1"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">IET Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Access your university results instantly</p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in text-center">
              <Loader2 className="w-12 h-12 text-indigo-500 dark:text-indigo-400 animate-spin mb-6" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide transition-all ease-in-out">
                {loadingMessage}
              </h3>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-6 animate-fade-in text-center w-full">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center mb-4 border border-rose-200 dark:border-rose-500/30">
                <AlertTriangle className="w-8 h-8 text-rose-500 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-8 px-4 leading-relaxed">{error}</p>

              <div className="flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="flex-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-white font-medium py-3 rounded-xl transition-all"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(79,70,229,0.39)] dark:shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                >
                  Retry Search
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div className="space-y-1.5">
                <label htmlFor="rollno" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Roll Number
                </label>
                <input
                  id="rollno"
                  type="text"
                  maxLength={7}
                  placeholder="22M5045"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all uppercase placeholder:normal-case placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white shadow-sm dark:shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Student Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-gray-900 dark:text-white shadow-sm dark:shadow-inner appearance-none relative z-10"
                  >
                    <option value="Regular" className="bg-white dark:bg-gray-900">Regular</option>
                    <option value="EX" className="bg-white dark:bg-gray-900">EX</option>
                    <option value="Elective" className="bg-white dark:bg-gray-900">Elective</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400 z-20">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 shadow-[0_4px_14px_rgba(79,70,229,0.39)] dark:shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                <>
                  <Search className="w-5 h-5" />
                  <span>View Result</span>
                </>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
