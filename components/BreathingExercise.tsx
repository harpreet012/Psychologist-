"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

type Phase = "in" | "hold" | "out";

const PHASE_DURATIONS: Record<Phase, number> = {
  in: 4000,
  hold: 4000,
  out: 5000,
};

const PHASE_LABELS: Record<Phase, string> = {
  in: "Breathe In",
  hold: "Hold",
  out: "Breathe Out",
};

const PHASE_SCALE: Record<Phase, number> = {
  in: 1.5,
  hold: 1.5,
  out: 1,
};

const NEXT_PHASE: Record<Phase, Phase> = {
  in: "hold",
  hold: "out",
  out: "in",
};

export default function BreathingExercise() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("in");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    timeoutRef.current = setTimeout(() => {
      setPhase((p) => NEXT_PHASE[p]);
    }, PHASE_DURATIONS[phase]);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRunning, phase]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => {
    setIsRunning(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const handleReset = () => {
    setIsRunning(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase("in");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl bg-white p-8 shadow-card sm:p-10">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <motion.div
          animate={{ scale: isRunning ? PHASE_SCALE[phase] : 1 }}
          transition={{ duration: PHASE_DURATIONS[phase] / 1000, ease: "easeInOut" }}
          className="absolute h-24 w-24 rounded-full bg-lavender-200"
        />
        <motion.div
          animate={{ scale: isRunning ? PHASE_SCALE[phase] : 1 }}
          transition={{
            duration: PHASE_DURATIONS[phase] / 1000,
            ease: "easeInOut",
          }}
          className="absolute h-24 w-24 rounded-full bg-sage-300/70 mix-blend-multiply"
        />
        <span className="relative z-10 text-center font-serif text-base text-charcoal">
          {isRunning ? PHASE_LABELS[phase] : "Ready"}
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 rounded-full bg-sage-500 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-sage-600"
          >
            <Play size={15} /> Start Exercise
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="inline-flex items-center gap-2 rounded-full bg-sage-500 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-sage-600"
          >
            <Pause size={15} /> Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-5 py-2.5 text-sm font-medium text-charcoal-soft transition-colors hover:bg-charcoal/5"
        >
          <RotateCcw size={15} /> Reset
        </button>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-charcoal-muted">
        A simple wellness exercise, not medical treatment. Stop at any time
        if it feels uncomfortable.
      </p>
    </div>
  );
}
