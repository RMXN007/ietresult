import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import ResultTable from '../components/ResultTable';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.resultData;

  if (!resultData) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 p-8 rounded-2xl shadow-xl dark:shadow-2xl text-center max-w-sm w-full animate-fade-in-up transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No Data Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Please run a search to view results.</p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(79,70,229,0.39)] dark:shadow-md hover:shadow-indigo-500/25 active:scale-95"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-12 font-sans text-gray-900 dark:text-gray-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 print:hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium text-sm group bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 px-4 py-2 rounded-lg border border-transparent dark:hover:border-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            New Search
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto mt-8 md:mt-12 space-y-12 px-4 sm:px-6 lg:px-8">
        <div id="result-card" className="space-y-12 bg-[#f8fafc] dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-black p-4 sm:p-8 md:p-12 rounded-3xl -mx-4 sm:-mx-8 md:-mx-12 shadow-xl dark:shadow-2xl transition-colors duration-300">
          <ResultCard student={{
              name: resultData.name,
              roll: resultData.roll,
              enrollment: resultData.enrollment,
              branch: resultData.branch,
              semester: resultData.semester
          }} summary={{
              sgpa: resultData.sgpa,
              status: resultData.status
          }} />

          <ResultTable 
              subjects={resultData.subjects} 
          />
        </div>
      </main>
    </div>
  );
}
