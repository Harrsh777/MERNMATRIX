"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function MERNTeamCarousel() {
  const cards = teamData.map((member, index) => (
    <Card key={member.title} card={member} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Meet the MERN Mavericks!
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const MemberBio = ({ bio, skills }: { bio: string; skills: string[] }) => {
  return (
    <div className="bg-black p-8 md:p-14 rounded-3xl mb-4 shadow-2xl border border-gray-800 transform transition-all duration-300 hover:scale-[1.01]">
      <p className="text-gray-300 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">
          {bio}
        </span>
        <div className="mt-6">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Skills:</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-white text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </p>
    </div>
  );
};

const teamData = [
  {
    category: "Lead Developer",
    title: "Anya Sharma - The Architect",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <MemberBio
        bio="Anya architects our backend with MongoDB and Node.js finesse. Handles the server-side logic and database design."
        skills={["MongoDB", "Node.js", "Express", "REST APIs", "GraphQL"]}
      />
    ),
  },
  {
    category: "Frontend Engineer",
    title: "Ben Carter - The Pixel Pusher",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <MemberBio
        bio="Ben crafts stunning UIs with React and Tailwind CSS. Transforms wireframes into interactive experiences."
        skills={["React", "Tailwind CSS", "JavaScript", "UI/UX Design"]}
      />
    ),
  },
  {
    category: "Full-Stack Developer",
    title: "Chloe Davis - The MERN Magician",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <MemberBio
        bio="Chloe is our full-stack guru, seamlessly connecting frontend and backend components. Handles deployment and CI/CD pipelines."
        skills={[
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "AWS",
          "CI/CD",
        ]}
      />
    ),
  },
  {
    category: "Quality Assurance",
    title: "David Evans - The Bug Hunter",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <MemberBio
        bio="David ensures our code is robust and reliable, finding and squashing bugs with ruthless efficiency."
        skills={["Jest", "Cypress", "End-to-End Testing", "Unit Testing"]}
      />
    ),
  },
  {
    category: "UI/UX Designer",
    title: "Emily Foster - The Experience Architect",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <MemberBio
        bio="Emily crafts intuitive and engaging user experiences, making our applications a joy to use."
        skills={["Figma", "UI/UX Design", "Wireframing", "Prototyping"]}
      />
    ),
  },
  {
    category: "Project Manager",
    title: "Frank Garcia - The Maestro",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: (
      <MemberBio
        bio="Frank keeps our projects on track and on budget, ensuring smooth collaboration and timely delivery."
        skills={["Agile", "Scrum", "Project Management", "Communication"]}
      />
    ),
  },
];