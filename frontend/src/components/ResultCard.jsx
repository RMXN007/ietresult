import { Hash, User, GraduationCap, Share2, TrendingUp, Award, Download } from 'lucide-react';
import html2canvas from "html2canvas";

export default function ResultCard({ student, summary }) {
  if (!student) return null;

  const handleShare = async () => {
    const element = document.getElementById("result-card");
    const canvas = await html2canvas(element, { scale: 2 });
    
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
    const element = document.getElementById("result-card");
    const canvas = await html2canvas(element, { scale: 2 });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "result.png";
    link.click();
  };

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Blue Hero Banner */}
      <div className="w-full bg-[#0033FF] py-12 print:bg-white print:text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col border-white print:border-black">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight print:text-black">
              {student.name}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-6 text-white/90 font-medium tracking-wide print:text-gray-700">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-white/70 print:text-gray-500" />
                <span className="text-lg">{student.roll}</span>
              </div>
              
              {student.enrollment && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-white/70 print:text-gray-500" />
                  <span className="text-lg">{student.enrollment}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-white/70 print:text-gray-500" />
                <span className="text-white/70 uppercase tracking-widest text-sm font-bold print:text-gray-500">Branch:</span>
                <span className="text-lg">{student.branch || 'Unknown'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleDownload}
              className="hidden md:flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-sm font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg print:hidden"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button 
              onClick={handleShare}
              className="hidden md:flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black px-8 py-3 rounded-sm font-black uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg print:hidden"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="w-full py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* SGPA Tile */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#ccff00] flex items-center justify-center border-4 border-black shrink-0">
              <TrendingUp className="w-10 h-10 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-1">SGPA</span>
              <span className="text-5xl md:text-6xl font-black text-black leading-none">{summary.sgpa || 'N/A'}</span>
            </div>
          </div>

          {/* Result Status Tile */}
          <div className="flex items-center gap-6 md:justify-end">
            <div className="w-20 h-20 bg-[#22c55e] flex items-center justify-center border-4 border-black shrink-0">
              <Award className="w-10 h-10 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-1">Result</span>
              <span className="text-5xl md:text-6xl font-black text-black leading-none uppercase">{summary.status || 'N/A'}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
