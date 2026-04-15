import React from 'react';
import { motion } from 'motion/react';
import { MicOff } from 'lucide-react';

interface Props {
  onClose: () => void;
  error?: string | null;
}

export default function PermissionModal({ onClose, error }: Props) {
  const isNoMic = error?.includes("No microphone found");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
        
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
          <MicOff size={32} className="text-red-400" />
        </div>
        
        <h2 className="text-2xl font-serif font-medium text-white mb-3">
          {isNoMic ? "Microphone Not Found" : "Microphone Blocked"}
        </h2>
        <p className="text-white/60 text-sm mb-6 leading-relaxed">
          {isNoMic 
            ? "Mikasa couldn't find a microphone connected to your device. Please check your hardware."
            : "Your browser has blocked microphone access for this site. Mikasa cannot hear you until you allow it."
          }
        </p>
        
        {!isNoMic && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left w-full mb-8">
            <p className="text-sm text-white/80 font-medium mb-2">How to fix this:</p>
            <ol className="text-xs text-white/60 list-decimal pl-4 space-y-2">
              <li className="text-white/90 font-semibold">Try opening the app in a new tab using the icon in the top right of the preview.</li>
              <li>Click the <strong>lock icon (🔒)</strong> or <strong>tune icon (⚙️)</strong> next to the URL bar at the top of your browser.</li>
              <li>Find <strong>Microphone</strong> and change it to <strong>Allow</strong>.</li>
              <li>Refresh the page.</li>
            </ol>
          </div>
        )}

        {isNoMic && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left w-full mb-8">
            <p className="text-sm text-white/80 font-medium mb-2">Troubleshooting:</p>
            <ul className="text-xs text-white/60 list-disc pl-4 space-y-2">
              <li>Ensure your microphone is plugged in correctly.</li>
              <li>Check if your microphone is being used by another app.</li>
              <li>Try restarting your browser.</li>
            </ul>
          </div>
        )}
        
        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            I've allowed it, Refresh Page
          </button>
          <button 
            onClick={onClose}
            className="w-full py-3 px-4 bg-white/5 text-white/70 font-medium rounded-xl hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
