"use client";
import { ArcTimeline, ArcTimelineItem } from "@/components/magicui/arc-timeline";
import {
  FaRocket,
  FaCode,
  FaUsers,
  FaBolt,
  FaStar,
  FaGlobe,
  FaBookOpen,
  FaPuzzlePiece,
  FaTerminal,
} from "react-icons/fa";

export function MERNClubTimeline() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0A0118] to-[#1E0345]">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#CBC3E3] bg-[#A020F0]/10 rounded-full mb-4 border border-[#CBC3E3]/20">
          OUR JOURNEY
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
          MERN Club <span className="text-[#A020F0]">Timeline</span>
        </h2>
        <p className="text-lg text-[#E0E0E0] max-w-2xl mx-auto">
          Key milestones and events in our club's history
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <ArcTimeline
          className="[--step-line-active-color:#A020F0] dark:[--step-line-active-color:#A020F0]"
          data={MERN_TIMELINE}
          defaultActiveStep={{ time: "2024 Q2", stepIndex: 0 }}
          arcConfig={{
            circleWidth: 4000,
            angleBetweenMinorSteps: 0.4,
            lineCountFillBetweenSteps: 8,
            boundaryPlaceholderLinesCount: 50,
          }}
        />
      </div>
    </section>
  );
}

const MERN_TIMELINE: ArcTimelineItem[] = [
  {
    time: "2023 Q3",
    steps: [
      {
        icon: <FaRocket size={20} className="text-[#A020F0]" />,
        content: "MERN Stack Club officially founded with initial 50 members",
      },
      {
        icon: <FaCode size={20} className="text-[#A020F0]" />,
        content: "First workshop: Introduction to MERN Stack fundamentals",
      },
    ],
  },
  {
    time: "2023 Q4",
    steps: [
      {
        icon: <FaUsers size={20} className="text-[#A020F0]" />,
        content: "Community grows to 200+ developers",
      },
      {
        icon: <FaCode size={20} className="text-[#A020F0]" />,
        content: "First hackathon with 30 participating teams",
      },
      {
        icon: <FaBookOpen size={20} className="text-[#A020F0]" />,
        content: "Launched beginner-friendly tutorial series on YouTube",
      },
    ],
  },
  {
    time: "2024 Q1",
    steps: [
      {
        icon: <FaBolt size={20} className="text-[#A020F0]" />,
        content: "First production app built by club members goes live",
      },
      {
        icon: <FaGlobe size={20} className="text-[#A020F0]" />,
        content: "Expanded to 3 university chapters",
      },
      {
        icon: <FaPuzzlePiece size={20} className="text-[#A020F0]" />,
        content: "Introduced advanced MERN optimization techniques workshop",
      },
    ],
  },
  {
    time: "2024 Q2",
    steps: [
      {
        icon: <FaStar size={20} className="text-[#A020F0]" />,
        content: "Won 'Best Tech Community' at Developer Awards",
      },
      {
        icon: <FaCode size={20} className="text-[#A020F0]" />,
        content: "Launched open-source MERN starter kit with 500+ GitHub stars",
      },
      {
        icon: <FaUsers size={20} className="text-[#A020F0]" />,
        content: "First international member joins from Canada",
      },
    ],
  },
  {
    time: "2024 Q3",
    steps: [
      {
        icon: <FaStar size={20} className="text-[#A020F0]" />,
        content: "Annual MERN Hackathon with $10k in prizes",
      },
      {
        icon: <FaBookOpen size={20} className="text-[#A020F0]" />,
        content: "Published comprehensive MERN Stack ebook",
      },
    ],
  },
  {
    time: "2024 Q4",
    steps: [
      {
        icon: <FaRocket size={20} className="text-[#A020F0]" />,
        content: "Club members launch 10+ commercial MERN applications",
      },
      {
        icon: <FaGlobe size={20} className="text-[#A020F0]" />,
        content: "Partnership with MongoDB, Express, React, and Node.js foundations",
      },
    ],
  },
  {
    time: "2025 Q1",
    steps: [
      {
        icon: <FaStar size={20} className="text-[#A020F0]" />,
        content: "First MERN Stack certification program launched",
      },
      {
        icon: <FaBolt size={20} className="text-[#A020F0]" />,
        content: "Real-time collaboration tools added to workshops",
      },
      {
        icon: <FaUsers size={20} className="text-[#A020F0]" />,
        content: "Membership surpasses 1,000 developers worldwide",
      },
    ],
  },
  {
    time: "2025 Q2",
    steps: [
      {
        icon: <FaTerminal size={20} className="text-[#A020F0]" />,
        content: "MERN Stack job placement program begins",
      },
      {
        icon: <FaPuzzlePiece size={20} className="text-[#A020F0]" />,
        content: "Advanced microservices architecture workshop series",
      },
    ],
  },
  {
    time: "2025 Q3",
    steps: [
      {
        icon: <FaStar size={20} className="text-[#A020F0]" />,
        content: "Global MERN Stack competition with participants from 15 countries",
      },
      {
        icon: <FaBookOpen size={20} className="text-[#A020F0]" />,
        content: "Published case studies of successful MERN implementations",
      },
    ],
  },
];