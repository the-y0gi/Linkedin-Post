import { useState, useEffect } from "react";
import { GeneratePostPayload, VoiceType, LengthType } from "@/types/post.types";
import {
  Sparkles,
  Target,
  MessageSquare,
  AlignLeft,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onGenerate: (data: GeneratePostPayload) => void;
  loading: boolean;
}

export default function PostForm({ onGenerate, loading }: Props) {
  const [voice, setVoice] = useState<VoiceType>("friendly");
  const [audience, setAudience] = useState("");
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState<LengthType>("medium");

  useEffect(() => {
    if (!loading && audience && topic) {
      const timer = setTimeout(() => {
        if (window.innerWidth < 1024) {
          const previewSection = document.querySelector(".lg\:col-span-7");
          if (previewSection) {
            previewSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [loading]);
  const isFormValid = audience.trim() !== "" && topic.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    onGenerate({ voice, audience, topic, length });
  };

  const voices: { id: VoiceType; label: string; emoji: string }[] = [
    { id: "friendly", label: "Friendly", emoji: "😊" },
    { id: "authoritative", label: "Expert", emoji: "🧠" },
    { id: "motivational", label: "Inspiring", emoji: "✨" },
    { id: "contrarian", label: "Edgy", emoji: "⚡" },
  ];

  const lengths: { id: LengthType; label: string }[] = [
    { id: "short", label: "Short" },
    { id: "medium", label: "Medium" },
    { id: "long", label: "Detailed" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 p-0">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <MessageSquare size={14} className="text-blue-500" /> Tone
        </label>
        <div className="grid grid-cols-2 gap-2">
          {voices.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVoice(v.id)}
              className={`relative flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-300 group ${
                voice === v.id
                  ? "border-blue-500/50 bg-blue-600/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-800/60"
              }`}
            >
              <span className="text-xs font-semibold z-10">{v.label}</span>
              <span className="text-sm z-10 opacity-80 group-hover:scale-110 transition-transform">
                {v.emoji}
              </span>
              {voice === v.id && (
                <motion.div
                  layoutId="activeVoice"
                  className="absolute inset-0 bg-blue-600/5 z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 group">
        <label className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-blue-400 transition-colors">
          <Target size={14} /> Audience
        </label>
        <input
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="e.g. Startup Founders"
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner outline-none focus:border-blue-500/30"
        />
      </div>

      <div className="space-y-2 group">
        <label className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-blue-400 transition-colors">
          <Sparkles size={14} /> Topic
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What's the post about?"
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 min-h-[90px] lg:min-h-[100px] max-h-[150px] resize-none focus:ring-1 focus:ring-blue-500/50 transition-all outline-none leading-relaxed focus:border-blue-500/30 shadow-inner"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <AlignLeft size={14} /> Length
        </label>
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800/50 shadow-inner">
          {lengths.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLength(l.id)}
              className={`relative flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all duration-300 ${
                length === l.id
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <span className="relative z-10">{l.label}</span>
              {length === l.id && (
                <motion.div
                  layoutId="activeLength"
                  className="absolute inset-0 bg-blue-600 rounded-md shadow-lg shadow-blue-600/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 lg:pt-4">
        <motion.button
          whileHover={isFormValid && !loading ? { scale: 1.01 } : {}}
          whileTap={isFormValid && !loading ? { scale: 0.98 } : {}}
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden relative
            ${
              isFormValid && !loading
                ? "bg-white text-slate-950 hover:bg-slate-100 shadow-[0_10px_20px_-5px_rgba(255,255,255,0.1)] active:shadow-none"
                : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50 border border-slate-700/50"
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>Crafting...</span>
            </>
          ) : (
            <>
              <span>Generate Viral Post</span>
              <Sparkles
                size={16}
                className={isFormValid ? "text-blue-600" : ""}
              />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}
