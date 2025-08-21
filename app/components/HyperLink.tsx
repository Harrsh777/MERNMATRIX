"use client";
import React from "react";
import { motion } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
      Look at us, building a modern MERN stack with
        <LinkPreview url="https://tailwindcss.com" className="font-bold text-white">Tailwind CSS</LinkPreview> + <LinkPreview url="https://framer.com/motion" className="font-bold text-white">Framer Motion</LinkPreview>.
        Or, for pre-built (but potentially leaky) components, see <LinkPreview url="https://ui.aceternity.com" className="font-bold bg-clip-text text-white bg-gradient-to-br from-purple-500 to-pink-500">Aceternity UI</LinkPreview>.
      </p>
    </div>
  );
}