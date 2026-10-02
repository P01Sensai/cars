"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrochureLibraryClient() {
  const [file1, setFile1] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  
  const [file2, setFile2] = useState<File | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      
      if (slot === 1) {
        setFile1(selectedFile);
        reader.onload = (e) => setPreview1(e.target?.result as string);
      } else {
        setFile2(selectedFile);
        reader.onload = (e) => setPreview2(e.target?.result as string);
      }
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file1 && !file2) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI parsing delay for both files
    setTimeout(() => {
      setAnalysisResult({
        car1: file1 ? {
          name: "Car 1 (From Brochure)",
          engine: "1.5L Turbo Petrol",
          power: "150 bhp",
          torque: "250 Nm",
          bootSpace: "420 L"
        } : null,
        car2: file2 ? {
          name: "Car 2 (From Brochure)",
          engine: "2.0L Diesel",
          power: "170 bhp",
          torque: "350 Nm",
          bootSpace: "450 L"
        } : null
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="site-max mx-auto px-8 pb-32">
      <div className="mb-12">
        <h1 className="text-5xl font-black font-heading tracking-tighter mb-4">BROCHURE AI</h1>
        <p className="text-xl text-foreground/60 font-light max-w-2xl">
          Upload up to two car brochures to extract and instantly compare their specifications using our Vision AI.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        
        {/* Upload Zones (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dropzone 1 */}
          <label className="relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-foreground/20 rounded-3xl cursor-pointer bg-foreground/5 hover:bg-foreground/10 transition-colors overflow-hidden group">
            {preview1 ? (
              <img src={preview1} alt="Brochure 1" className="w-full h-full object-contain p-4" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <svg className="w-12 h-12 mb-4 text-foreground/50 group-hover:scale-110 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-foreground/70 font-bold">Upload Car 1 Brochure</p>
              </div>
            )}
            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 1)} accept="image/*" />
          </label>

          {/* Dropzone 2 */}
          <label className="relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-foreground/20 rounded-3xl cursor-pointer bg-foreground/5 hover:bg-foreground/10 transition-colors overflow-hidden group">
            {preview2 ? (
              <img src={preview2} alt="Brochure 2" className="w-full h-full object-contain p-4" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <svg className="w-12 h-12 mb-4 text-foreground/50 group-hover:scale-110 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-foreground/70 font-bold">Upload Car 2 Brochure <span className="font-normal text-foreground/50">(Optional)</span></p>
              </div>
            )}
            <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 2)} accept="image/*" />
          </label>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleAnalyze}
            disabled={(!file1 && !file2) || isAnalyzing || analysisResult}
            className="w-full md:w-1/2 py-4 bg-foreground text-background rounded-full font-bold uppercase tracking-widest disabled:opacity-50 transition-opacity"
          >
            {isAnalyzing ? "Extracting Data with Vision AI..." : "Extract & Compare Specifications"}
          </button>
        </div>

        {/* Results Zone */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-foreground/5 border border-foreground/10 rounded-3xl p-8 relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 justify-center font-heading tracking-widest">
                <svg className="text-green-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                EXTRACTION COMPLETE
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Result 1 */}
                {analysisResult.car1 && (
                  <div className="bg-background rounded-2xl p-6 border border-foreground/10">
                    <h4 className="text-xl font-bold mb-6 text-foreground/50">{analysisResult.car1.name}</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Engine</span>
                        <span className="font-bold">{analysisResult.car1.engine}</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Max Power</span>
                        <span className="font-bold">{analysisResult.car1.power}</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Max Torque</span>
                        <span className="font-bold">{analysisResult.car1.torque}</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Boot Space</span>
                        <span className="font-bold">{analysisResult.car1.bootSpace}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Result 2 */}
                {analysisResult.car2 && (
                  <div className="bg-background rounded-2xl p-6 border border-foreground/10">
                    <h4 className="text-xl font-bold mb-6 text-foreground/50">{analysisResult.car2.name}</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Engine</span>
                        <span className="font-bold">{analysisResult.car2.engine}</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Max Power</span>
                        <span className="font-bold">{analysisResult.car2.power}</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Max Torque</span>
                        <span className="font-bold">{analysisResult.car2.torque}</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/10 pb-2">
                        <span className="text-foreground/60">Boot Space</span>
                        <span className="font-bold">{analysisResult.car2.bootSpace}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
