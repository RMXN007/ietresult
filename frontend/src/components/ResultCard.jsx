import { Hash, GraduationCap, Share2, TrendingUp, Award, Download, User } from 'lucide-react';
import html2canvas from "html2canvas";

export default function ResultCard({ student, summary }) {
  if (!student) return null;

  const handleShare = async () => {
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#111827' : '#f8fafc';
    const element = document.getElementById("result-card");
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: bgColor });
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "result.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Result",
        });
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "result.png";
        link.click();
      }
    });
  };

  const handleDownload = async () => {
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#111827' : '#f8fafc';
    const element = document.getElementById("result-card");
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: bgColor });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "result.png";
    link.click();
  };

  const isPass = summary.status?.toUpperCase().includes('PASS');

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up">
      {/* Header Glass Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-md dark:shadow-2xl transition-colors duration-300">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6 drop-shadow-sm transition-colors duration-300">
              {student.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 dark:text-gray-300 font-medium">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-inner">
                <Hash className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm sm:text-base">{student.roll}</span>
              </div>
              
              {student.enrollment && (
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-inner">
                  <User className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-sm sm:text-base">{student.enrollment}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-inner">
                <GraduationCap className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm sm:text-base uppercase tracking-wider">{student.branch || 'Unknown'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-50 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97] border border-gray-200 dark:border-white/10 print:hidden shadow-sm dark:shadow-lg dark:backdrop-blur-md"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleShare}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.97] border border-transparent print:hidden shadow-[0_4px_14px_rgba(79,70,229,0.39)] dark:shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SGPA Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-transparent dark:bg-gradient-to-br dark:from-indigo-500/10 dark:to-purple-600/10 backdrop-blur-xl border border-indigo-100 dark:border-indigo-500/20 p-6 sm:p-8 shadow-md dark:shadow-xl flex items-center gap-6 group hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-50 dark:bg-transparent dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-indigo-500/80 dark:text-indigo-300/80 font-bold uppercase tracking-widest text-xs sm:text-sm mb-1">SGPA Score</p>
            <p className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tighter transition-colors duration-300">{summary.sgpa || 'N/A'}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className={`relative overflow-hidden rounded-3xl bg-white dark:bg-transparent dark:bg-gradient-to-br backdrop-blur-xl border p-6 sm:p-8 shadow-md dark:shadow-xl flex items-center gap-6 group transition-colors duration-300 ${isPass ? 'dark:from-emerald-500/10 dark:to-teal-600/10 border-emerald-100 dark:border-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-500/40' : 'dark:from-rose-500/10 dark:to-red-600/10 border-rose-100 dark:border-rose-500/20 hover:border-rose-300 dark:hover:border-rose-500/40'}`}>
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ${isPass ? 'bg-emerald-50 dark:bg-transparent dark:bg-emerald-500/20 border-emerald-100 dark:border-emerald-500/30' : 'bg-rose-50 dark:bg-transparent dark:bg-rose-500/20 border-rose-100 dark:border-rose-500/30'}`}>
            <Award className={`w-8 h-8 sm:w-10 sm:h-10 ${isPass ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`} strokeWidth={2.5} />
          </div>
          <div>
            <p className={`font-bold uppercase tracking-widest text-xs sm:text-sm mb-1 ${isPass ? 'text-emerald-600/80 dark:text-emerald-300/80' : 'text-rose-600/80 dark:text-rose-300/80'}`}>Result Status</p>
            <p className={`text-4xl sm:text-5xl font-black tracking-tighter uppercase transition-colors duration-300 text-gray-900 dark:text-white`}>{summary.status || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
