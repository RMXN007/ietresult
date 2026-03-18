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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Result Data</h2>
          <p className="text-gray-500 mb-6">Please search for a roll number first.</p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-[#0033FF] hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-all font-medium"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white pb-0 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-[#0033FF] transition-colors font-semibold tracking-wide text-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </button>
        </div>
      </div>

      {/* Printable Header - Only shows when printing */}
      <div className="hidden print:block text-center mt-8 mb-4 border-b pb-4">
        <h1 className="text-2xl font-black text-gray-900">IET DAVV RESULT</h1>
        <p className="text-gray-500 font-semibold text-sm mt-1">Acquired from official university portal</p>
      </div>

      {/* Main Content Area - Full Width Bands */}
      <main className="flex-grow">
        <div id="result-card">
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


      {/* Printable Disclaimer */}
      <div className="hidden print:block text-center mt-12 text-gray-400 font-medium text-xs">
        <p>Disclaimer: This is a fetched copy. In case of any discrepancy, please verify with the official IET DAVV portal.</p>
      </div>
      
    </div>
  );
}
