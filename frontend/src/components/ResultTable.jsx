import { BookOpen } from 'lucide-react';

export default function ResultTable({ subjects }) {
  if (!subjects || subjects.length === 0) return null;

  const getGradeColor = (grade) => {
    if (!grade || grade === '-') return 'text-gray-400';
    const cleanGrade = grade.trim().toUpperCase();
    if (['O', 'A+'].includes(cleanGrade)) return 'text-green-600 dark:text-green-400';
    if (['A'].includes(cleanGrade)) return 'text-blue-600 dark:text-blue-400';
    if (['B+', 'B'].includes(cleanGrade)) return 'text-yellow-600 dark:text-yellow-400';
    if (['C', 'P'].includes(cleanGrade)) return 'text-orange-600 dark:text-orange-400';
    if (cleanGrade === 'F') return 'text-red-600 dark:text-red-500';
    return 'text-gray-400 dark:text-gray-300';
  };

  return (
    <div className="w-full animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '150ms' }}>
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/30 transition-colors duration-300">
          <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">Subject Performance</h2>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-md dark:shadow-lg border border-gray-200 dark:border-transparent dark:ring-1 dark:ring-white/10 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300">
              <tr>
                 <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject Name</th>
                 <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Theory Grade</th>
                 <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Practical Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors duration-200 last:border-0">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">{item.subject}</span>
                      {item.code && (
                        <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{item.code}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center align-middle">
                    <span className={`font-bold ${getGradeColor(item.theory)}`}>
                      {item.theory || '-'}
                    </span>
                  </td>
                  <td className="p-4 text-center align-middle">
                    <span className={`font-bold ${getGradeColor(item.practical)}`}>
                      {item.practical || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Scale Legend */}
      <div className="mt-12">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 px-2 transition-colors duration-300">Grade Scale</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {[
            { grade: 'O', range: '90-100' },
            { grade: 'A+', range: '80-89' },
            { grade: 'A', range: '70-79' },
            { grade: 'B+', range: '60-69' },
            { grade: 'B', range: '50-59' },
            { grade: 'C', range: '40-49' },
            { grade: 'P', range: '35-39' },
            { grade: 'F', range: '0-35' }
          ].map((scale, i) => (
            <div key={i} className="bg-white dark:bg-[#1e293b] rounded-lg p-3 text-center flex flex-col justify-center border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-md transition-colors duration-300">
              <span className={`text-xl font-bold leading-none mb-1.5 ${getGradeColor(scale.grade)}`}>
                {scale.grade}
              </span>
              <span className="text-[10px] font-mono font-medium text-gray-500 tracking-wider">
                {scale.range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
