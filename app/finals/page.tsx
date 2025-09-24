"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function formatTwo(n: number) {
  return n.toString().padStart(2, "0");
}

function getTargetDateToday(hours: number, minutes: number): Date {
  const now = new Date();
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  return target;
}

function calcTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeLeft = useMemo(() => calcTimeLeft(target), [now, target]);
  const isExpired = useMemo(() => new Date() >= target, [now, target]);
  return { timeLeft, isExpired };
}

function CountdownDisplay({ label, target }: { label: string; target: Date }) {
  const { timeLeft, isExpired } = useCountdown(target);
  if (isExpired) return null;
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground tracking-wide uppercase">{label}</p>
      <div className="grid grid-flow-col auto-cols-fr gap-3 text-center">
        {[
          { k: "Days", v: timeLeft.days },
          { k: "Hours", v: timeLeft.hours },
          { k: "Minutes", v: timeLeft.minutes },
          { k: "Seconds", v: timeLeft.seconds },
        ].map((item) => (
          <div key={item.k} className="rounded-md border border-input/60 bg-background/60 dark:bg-input/30 backdrop-blur p-4">
            <div className="text-3xl md:text-5xl font-semibold tabular-nums">
              {formatTwo(item.v)}
            </div>
            <div className="mt-1 text-xs md:text-sm text-muted-foreground">{item.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinalsPage() {
  const eightPM = useMemo(() => getTargetDateToday(20, 0), []);
  const midnight = useMemo(() => getTargetDateToday(24, 0), []);
  const { isExpired: isAfterEight } = useCountdown(eightPM);
  const { isExpired: isAfterMidnight } = useCountdown(midnight);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    teamName: "",
    teamLeaderName: "",
    projectUrl: "",
    githubUrl: "",
    gist: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/finals/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-10 md:py-16">
      {!isAfterEight && (
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Final Submission for the Hackathon
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Submit your project by 8:00 PM today. The form opens when the timer ends.
          </p>
          <div className="mt-2">
            <CountdownDisplay label="Time left until submissions open" target={eightPM} />
          </div>
        </div>
      )}

      {isAfterEight && !isAfterMidnight && (
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-semibold">Final Submission Form</h2>
            <p className="text-muted-foreground mt-2">
              Please complete all fields. Submissions close at midnight.
            </p>
            <div className="mt-4">
              <CountdownDisplay label="Time left to submit" target={midnight} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Team Name</label>
              <Input name="teamName" value={form.teamName} onChange={handleChange} required placeholder="Enter your team name" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Team Leader Name</label>
              <Input name="teamLeaderName" value={form.teamLeaderName} onChange={handleChange} required placeholder="Enter team leader's full name" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Deployed Project Link</label>
              <Input name="projectUrl" type="url" value={form.projectUrl} onChange={handleChange} required placeholder="https://yourapp.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">GitHub Repository</label>
              <Input name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} required placeholder="https://github.com/org/repo" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">100-word Gist</label>
              <textarea
                name="gist"
                value={form.gist}
                onChange={handleChange}
                required
                minLength={20}
                maxLength={900}
                className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                )}
                rows={5}
                placeholder="Summarize what you built in ~100 words"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>

          {submitted && (
            <p className="text-sm text-green-600 dark:text-green-400">Submission received. Thank you!</p>
          )}
        </div>
      )}

      {isAfterMidnight && (
        <div className="text-center py-16">
          <h3 className="text-2xl md:text-4xl font-semibold">No more submissions — time is up.</h3>
          <p className="text-muted-foreground mt-2">Thank you for participating!</p>
        </div>
      )}
    </div>
  );
}


