"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaServer,
  FaCodeBranch,
} from "react-icons/fa";

export function MERNBentoGrid() {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-[#0A0118] to-[#1E0345]">
      <div className="max-w-7xl mx-auto">
        <BentoGrid className="max-w-4xl mx-auto h-[18cm] md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-col space-y-2 p-4"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-[#A020F0] p-2 items-center space-x-2 bg-black"
      >
        <FaReact className="h-6 w-6 text-[#61DAFB]" />
        <div className="w-full bg-gray-800 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-[#A020F0] p-2 items-center space-x-2 w-3/4 ml-auto bg-black"
      >
        <div className="w-full bg-gray-800 h-4 rounded-full" />
        <FaNodeJs className="h-6 w-6 text-[#68A063]" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-[#A020F0] p-2 items-center space-x-2 bg-black"
      >
        <FaDatabase className="h-6 w-6 text-[#589636]" />
        <div className="w-full bg-gray-800 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = ["React", "Express", "MongoDB", "Node.js", "MERN"];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-col space-y-2 p-4"
    >
      {arr.map((tech, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-[#A020F0] p-2 items-center space-x-2 bg-gray-900 w-full h-4"
        >
          <span className="text-xs text-white ml-2">{tech}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-black flex-col space-y-2 p-4"
      style={{
        background:
          "linear-gradient(-45deg, #A020F0, #6e2b9e, #4a1e6a, #2d1147)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="text-white text-center mt-4">
        <FaServer className="h-8 w-8 mx-auto mb-2" />
        <p className="text-sm">Full Stack Development</p>
      </div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-row space-x-2 p-4"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl border border-[#A020F0] p-4 bg-black flex flex-col items-center justify-center"
      >
        <FaReact className="h-10 w-10 text-[#61DAFB]" />
        <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
          React Frontend
        </p>
        <p className="border border-[#61DAFB] bg-[#61DAFB]/10 text-[#61DAFB] text-xs rounded-full px-2 py-0.5 mt-4">
          Component-based
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl border border-[#A020F0] p-4 bg-black flex flex-col items-center justify-center">
        <FaNodeJs className="h-10 w-10 text-[#68A063]" />
        <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
          Node.js Backend
        </p>
        <p className="border border-[#68A063] bg-[#68A063]/10 text-[#68A063] text-xs rounded-full px-2 py-0.5 mt-4">
          JavaScript Runtime
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl border border-[#A020F0] p-4 bg-black flex flex-col items-center justify-center"
      >
        <FaDatabase className="h-10 w-10 text-[#589636]" />
        <p className="sm:text-sm text-xs text-center font-semibold text-white mt-4">
          MongoDB
        </p>
        <p className="border border-[#589636] bg-[#589636]/10 text-[#589636] text-xs rounded-full px-2 py-0.5 mt-4">
          NoSQL Database
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-black flex-col space-y-2 p-4"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-[#A020F0] p-2 items-start space-x-2 bg-black"
      >
        <FaCodeBranch className="h-6 w-6 text-[#A020F0]" />
        <p className="text-xs text-white">
          MERN Stack combines MongoDB, Express, React, and Node.js for full-stack JavaScript development...
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-[#A020F0] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-black"
      >
        <p className="text-xs text-white">Build web apps faster</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#A020F0] to-[#6e2b9e] shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "React Components",
    description: (
      <span className="text-sm text-[#E0E0E0]">
        Build reusable UI components with React's powerful rendering.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <FaReact className="h-4 w-4 text-[#61DAFB]" />,
  },
  {
    title: "MERN Technologies",
    description: (
      <span className="text-sm text-[#E0E0E0]">
        Master the core technologies of the MERN stack ecosystem.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <FaServer className="h-4 w-4 text-[#A020F0]" />,
  },
  {
    title: "Full Stack Power",
    description: (
      <span className="text-sm text-[#E0E0E0]">
        Harness the full potential of JavaScript across the entire stack.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-[#A020F0]" />,
  },
  {
    title: "Stack Architecture",
    description: (
      <span className="text-sm text-[#E0E0E0]">
        Understand how each MERN component works together seamlessly.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-[#A020F0]" />,
  },
  {
    title: "Why MERN?",
    description: (
      <span className="text-sm text-[#E0E0E0]">
        Learn the advantages of using MERN for modern web development.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-[#A020F0]" />,
  },
];