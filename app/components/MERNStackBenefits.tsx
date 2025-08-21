"use client";
import React from 'react';

import { FaGoogle, FaAmazon, FaApple, FaFacebook, FaMicrosoft, FaGithub } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
import ScrollStack, { ScrollStackItem } from './scrollstack';

export function MERNBenefitsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0A0118] to-[#1E0345]">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#CBC3E3] bg-[#A020F0]/10 rounded-full mb-4 border border-[#CBC3E3]/20">
          CAREER BOOSTER
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
          How MERN <span className="text-[#A020F0]">Elevates</span> Your Career
        </h2>
        <p className="text-lg text-[#E0E0E0] max-w-2xl mx-auto">
          Master these skills to crack top tech opportunities
        </p>
      </div>

      <div className="h-[150vh] relative">
        <ScrollStack>
          {/* Card 1 */}
          <ScrollStackItem>
            <div className="flex flex-col h-full p-8">
              <h2 className="text-2xl font-bold text-[#F0F0F0] mb-6">FAANG Ready</h2>
              <ul className="list-disc pl-5 text-[#CBC3E3] space-y-2 text-sm">
                <li>Full-stack JavaScript expertise</li>
                <li>Modern architecture patterns</li>
                <li>Production-grade app experience</li>
                <li>System design fundamentals</li>
              </ul>
            </div>
          </ScrollStackItem>

          {/* Card 2 */}
          <ScrollStackItem>
            <div className="flex flex-col h-full p-8">
              <h2 className="text-2xl font-bold text-[#F0F0F0] mb-6">Open Source Impact</h2>
              <ul className="list-disc pl-5 text-[#CBC3E3] space-y-2 text-sm">
                <li>Contribute to major JavaScript projects</li>
                <li>Build credibility for GSoC</li>
                <li>Collaborate with global developers</li>
                <li>Showcase your skills</li>
              </ul>
            </div>
          </ScrollStackItem>

          {/* Card 3 */}
          <ScrollStackItem>
            <div className="flex flex-col h-full p-8">
              <h2 className="text-2xl font-bold text-[#F0F0F0] mb-6">Startup Advantage</h2>
              <ul className="list-disc pl-5 text-[#CBC3E3] space-y-2 text-sm">
                <li>Rapid MVP development</li>
                <li>Cost-effective tech stack</li>
                <li>Scalable architecture</li>
                <li>Large developer community</li>
              </ul>
            </div>
          </ScrollStackItem>

          {/* Card 4 */}
          <ScrollStackItem>
            <div className="flex flex-col h-full p-8">
              <h2 className="text-2xl font-bold text-[#F0F0F0] mb-6">Why MERN?</h2>
              <div className="flex gap-4 mb-6">
                <SiMongodb className="text-green-500 text-2xl" />
                <SiExpress className="text-gray-300 text-2xl" />
                <SiReact className="text-blue-400 text-2xl" />
                <SiNodedotjs className="text-green-600 text-2xl" />
              </div>
              <ul className="list-disc pl-5 text-[#CBC3E3] space-y-2 text-sm">
                <li>Industry-standard technologies</li>
                <li>Full JavaScript ecosystem</li>
                <li>High-performance applications</li>
                <li>Future-proof skills</li>
              </ul>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}