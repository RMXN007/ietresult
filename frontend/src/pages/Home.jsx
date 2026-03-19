import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [rollno, setRollno] = useState('');
  const [type, setType] = useState('Regular');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rollno || rollno.trim() === '') {
      setError('Please enter a valid Roll Number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rollno: rollno.trim(), type })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch result');
      }

      // Navigate to result page with data
      navigate('/result', { state: { resultData: data } });

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 selection:bg-[#ccff00] selection:text-black">
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md overflow-hidden border-2 border-black">
        <div className="bg-[#0033FF] p-6 text-center text-white border-b-2 border-black">
          <h1 className="text-3xl font-black tracking-tight uppercase">IET DAVV Results</h1>
          <p className="text-white/80 font-mono text-xs mt-2 uppercase tracking-widest">Official University Portal Viewer</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rollno" className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                id="rollno"
                type="text"
                placeholder="e.g. 22I5045"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all uppercase placeholder:normal-case shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Student Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm bg-white"
              >
                <option value="Regular">Regular</option>
                <option value="EX">EX</option>
                <option value="Elective">Elective</option>
              </select>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-black uppercase tracking-widest py-4 rounded-sm transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Fetching Result...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Check Result</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-[#1a1a1a] p-4 text-center text-[10px] font-mono tracking-widest text-white uppercase border-t-2 border-black">
          Not affiliated with Devi Ahilya Vishwavidyalaya
        </div>
      </div>
    </div>
  );
}
