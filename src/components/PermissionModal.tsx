import React from 'react';
import { motion } from 'motion/react';
import { MicOff } from 'lucide-react';

interface Props {
  onClose: () => void;
  error?: string | null;
}

export default function PermissionModal({ onClose, error }: Props) {
  const isNoMic = error?.toLowerCase().includes("no microphone") || error?.toLowerCase().includes("not found");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-xl p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#151619] border border-white/10 rounded-2xl p-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Top Hardware Accent */}
        <div className="w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
        
        <div className="p-8 w-full flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-red-500/30 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" />
            <MicOff size={32} className="text-red-500 relative z-10" />
          </div>
          
          <div className="font-mono text-[10px] uppercase tracking-widest text-red-500/70 mb-2">System Alert // Peripheral Error</div>
          <h2 className="text-2xl font-sans font-bold text-white mb-2 tracking-tight">
            {isNoMic ? "Hardware Not Detected" : "Interface Blocked"}
          </h2>
          <p className="text-white/50 text-xs font-mono mb-8 uppercase tracking-tighter leading-relaxed">
            {isNoMic 
              ? "> Error code structure: Audio_Input_Null. peripheral connection required for Mikasa protocol."
              : "> Access denial protocol triggered. Chrome_Sandboxed_Iframe_Policy prevents audio capture."
            }
          </p>
          
          <div className="space-y-4 w-full">
            <div className="bg-black/40 border border-white/5 rounded-xl p-5 text-left w-full">
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Recommended Resolution
              </p>
              
              <ol className="text-xs text-white/80 space-y-3 font-sans">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">01</span>
                  <span className="font-semibold">Open in New Tab:</span> The browser preview often blocks hardware. Use the arrow icon in the top right to open in a dedicated tab.
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-mono">02</span>
                  <span><strong>Check Permissions:</strong> Click the Lock (🔒) icon in the URL bar and ensure Microphone is set to "Allow".</span>
                </li>
                {isNoMic && (
                  <li className="flex gap-3">
                    <span className="text-blue-400 font-mono">03</span>
                    <span><strong>Device Status:</strong> Ensure your headset or mic is fully plugged in and not disabled in system sound settings.</span>
                  </li>
                )}
              </ol>
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 px-6 bg-white text-black font-bold text-sm uppercase tracking-tighter rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98]"
              >
                Execute Page Refresh
              </button>
              <button 
                onClick={onClose}
                className="w-full py-3 px-6 bg-white/5 text-white/40 font-mono text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors"
              >
                Dismiss Modal
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Technical Detail */}
        <div className="w-full py-2 bg-black/60 border-t border-white/5 px-6 flex justify-between items-center">
          <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">Session_ID: {Math.random().toString(36).substring(7).toUpperCase()}</div>
          <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">v1.4.2</div>
        </div>
      </motion.div>
    </div>
  );
}
