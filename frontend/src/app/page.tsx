"use client";

import { useState, useEffect, useMemo } from "react";
import PostForm from "@/components/form/PostForm";
import api from "@/lib/api";
import { GeneratePostPayload } from "@/types/post.types";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  RefreshCw,
  Wand2,
  Clock,
  FileText,
  Hash,
  Share2,
} from "lucide-react";

export default function Home() {
  const [post, setPost] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastPayload, setLastPayload] = useState<GeneratePostPayload | null>(
    null,
  );

  const wordCount = useMemo(
    () => (post ? post.trim().split(/\s+/).length : 0),
    [post],
  );
  const readingTime = useMemo(() => Math.ceil(wordCount / 200), [wordCount]);

  useEffect(() => {
    const savedPost = localStorage.getItem("lastPost");
    const savedPayload = localStorage.getItem("lastPayload");
    if (savedPost) setPost(savedPost);
    if (savedPayload) setLastPayload(JSON.parse(savedPayload));
  }, []);

  useEffect(() => {
    if (post) localStorage.setItem("lastPost", post);
  }, [post]);
  useEffect(() => {
    if (lastPayload)
      localStorage.setItem("lastPayload", JSON.stringify(lastPayload));
  }, [lastPayload]);

  const handleGenerate = async (data: GeneratePostPayload) => {
    try {
      setLoading(true);
      setLastPayload(data);
      const res = await api.post("/api/posts/generate", data);
      setPost(res.data.data.post);
      toast.success("AI Post Ready!");
    } catch (error) {
      toast.error("Failed to generate post");
    } finally {
      setLoading(false);
    }
  };

  const handleImproveHook = async () => {
    if (!post) return;
    try {
      setLoading(true);
      const res = await api.post("/api/posts/improve-hook", { post });
      setPost(res.data.data.post);
      toast.success("Hook Optimized");
    } catch {
      toast.error("Improvement failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!post) return;
    await navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans overflow-y-auto lg:overflow-hidden">
      <header className="shrink-0 border-b border-white/5 bg-background/60 backdrop-blur-2xl z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-foreground leading-none flex items-center gap-1">
                NEXUS
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  {" "}
                  - CRAFT
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-[1px] w-4 bg-primary/50"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase opacity-70">
                  Intelligence Suite
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
              AI Engine Online
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow lg:overflow-hidden max-w-7xl mx-auto w-full px-4 lg:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4 lg:h-full flex flex-col"
          >
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2rem] p-5 lg:p-6 backdrop-blur-sm shadow-2xl lg:overflow-y-auto lg:no-scrollbar shrink-0 lg:shrink">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-0.5">
                  Create Content
                </h2>
                <p className="text-xs text-slate-400">
                  Viral LinkedIn posts in seconds
                </p>
              </div>
              <PostForm onGenerate={handleGenerate} loading={loading} />
            </div>
          </motion.div>

          <motion.div
            id="result-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col h-full space-y-4 min-h-[500px] lg:min-h-0 pb-10 lg:pb-0 scroll-mt-6"
          >
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Stat
                pillIcon={<FileText size={12} />}
                text={`${post.length} Chars`}
                color="text-blue-400"
              />
              <Stat
                pillIcon={<Hash size={12} />}
                text={`${wordCount} Words`}
                color="text-purple-400"
              />
              <Stat
                pillIcon={<Clock size={12} />}
                text={`${readingTime}m Read`}
                color="text-emerald-400"
              />
            </div>

            <div className="flex-grow relative bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden">
              <div className="h-full min-h-[400px] bg-[#0f172a] rounded-[2.2rem] overflow-hidden flex flex-col border border-slate-800/50">
                <div className="p-4 border-b border-slate-800/40 flex items-center gap-3 bg-slate-900/40 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <span className="text-white font-bold text-xs">AI</span>
                  </div>
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-xs font-bold text-white truncate leading-tight">
                      {lastPayload?.topic
                        ? `Topic: ${lastPayload.topic}`
                        : "LinkedIn AI Generator"}
                    </span>
                    <span className="text-[9px] font-medium text-slate-500 truncate">
                      {lastPayload?.audience
                        ? `Audience: ${lastPayload.audience}`
                        : "Optimization active"}{" "}
                      • Just now
                    </span>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 sm:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <LoadingSkeleton />
                    ) : post ? (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[16px] leading-[1.6] text-slate-200 whitespace-pre-wrap font-sans break-words"
                      >
                        {post}
                      </motion.div>
                    ) : (
                      <EmptyState />
                    )}
                  </AnimatePresence>
                </div>

                {post && !loading && (
                  <div className="p-4 border-t border-slate-800/50 bg-slate-900/60 backdrop-blur-md shrink-0">
                    <div className="flex gap-2 flex-wrap items-center justify-between">
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={handleImproveHook}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all active:scale-95"
                        >
                          <Wand2 size={16} /> Improve Hook
                        </button>
                        <button
                          onClick={() => handleGenerate(lastPayload!)}
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all active:rotate-180 duration-500"
                        >
                          <RefreshCw size={18} />
                        </button>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#020617] text-xs font-bold transition-all active:scale-95"
                      >
                        {copied ? (
                          <>
                            <Check size={16} className="text-emerald-600" />{" "}
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} /> Copy Post
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function Stat({
  pillIcon,
  text,
  color,
}: {
  pillIcon: React.ReactNode;
  text: string;
  color: string;
}) {
  return (
    <div className="px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-full flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
      <span className={color}>{pillIcon}</span> {text}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-3.5 bg-slate-800/40 rounded-full animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="h-[200px] lg:h-full flex flex-col items-center justify-center opacity-30">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
        <Wand2 size={32} className="text-slate-600" />
      </div>
      <p className="text-[10px] font-bold tracking-widest uppercase">
        Input details to generate
      </p>
    </div>
  );
}
