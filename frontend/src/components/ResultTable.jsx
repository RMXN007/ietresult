import { GraduationCap } from 'lucide-react';

export default function ResultTable({ subjects }) {
  if (!subjects || subjects.length === 0) return null;

  // Helper to colorize grades
  const getGradeColor = (grade) => {
    if (!grade || grade === '-') return 'text-gray-900';
    const cleanGrade = grade.trim().toUpperCase();
    if (['O', 'A+', 'A'].includes(cleanGrade)) return 'text-green-600';
    if (['B+', 'B'].includes(cleanGrade)) return 'text-blue-600';
    if (['C', 'P'].includes(cleanGrade)) return 'text-yellow-600';
    if (cleanGrade === 'F') return 'text-red-600';
    return 'text-gray-900';
  };

  const getLegendGrid = () => [
    { grade: 'O', range: '90-100' },
    { grade: 'A+', range: '80-89' },
    { grade: 'A', range: '70-79' },
    { grade: 'B+', range: '60-69' },
    { grade: 'B', range: '50-59' },
    { grade: 'C', range: '40-49' },
    { grade: 'P', range: '35-39' },
    { grade: 'F', range: '0-35' }
  ];

  return (
    <div className="w-full bg-white pb-20">

      {/* Table Header Strip */}
      <div className="w-full bg-[#1a1a1a] py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-white" />
          <h2 className="text-white text-xl font-black uppercase tracking-widest">Subject Grades</h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black text-sm uppercase tracking-widest text-[#1a1a1a] font-black">
                <th className="py-4 px-2 w-1/2">Subject</th>
                <th className="py-4 px-2 w-1/6">Code</th>
                <th className="py-4 px-2 w-1/6 text-center">Theory</th>
                <th className="py-4 px-2 w-1/6 text-center">Practical</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subjects.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-2 text-[#1a1a1a] font-medium text-base sm:text-lg uppercase tracking-wide">
                    {item.subject}
                  </td>
                  <td className="py-5 px-2 text-gray-500 font-mono text-sm uppercase tracking-wider">
                    {item.code || '-'}
                  </td>
                  <td className="py-5 px-2 text-center">
                    <span className={`text-xl font-black uppercase ${getGradeColor(item.theory)}`}>
                      {item.theory || '-'}
                    </span>
                  </td>
                  <td className="py-5 px-2 text-center">
                    <span className={`text-xl font-black uppercase ${getGradeColor(item.practical)}`}>
                      {item.practical || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grade Scale Legend */}
        <div className="mt-16 pt-8">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Grade Scale</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {getLegendGrid().map((scale, i) => (
              <div key={i} className="border-2 border-black p-3 text-center flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-black text-[#1a1a1a] leading-none mb-1">{scale.grade}</span>
                <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-wider font-mono">{scale.range}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
