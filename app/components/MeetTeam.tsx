"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";

export function MERNTeamCarousel() {
  const cards = teamData.map((member, index) => (
    <Card key={member.title} card={member} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
          Meet the MERN Mavericks!
        </h2>
        <p className="text-lg md:text-xl text-purple-200/80 max-w-3xl mx-auto">
          Our passionate team of developers, designers, and innovators working together to build amazing experiences
        </p>
      </motion.div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-3xl"></div>
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const MemberBio = ({ bio, skills, role }: { bio: string; skills: string[]; role: string }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl shadow-2xl border border-purple-700/30 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:border-purple-500/50"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-block px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs md:text-sm font-semibold rounded-full mb-3 md:mb-4 shadow-lg">
          {role}
        </div>
      </div>
      
      <p className="text-purple-100 text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-6 md:mb-8 text-center px-2">
        {bio}
      </p>
      
      <div className="space-y-3 md:space-y-4">
        <h4 className="text-xs md:text-sm uppercase tracking-wider text-purple-300 font-bold text-center">
          Core Skills
        </h4>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {skills.map((skill, index) => (
            <motion.span 
              key={skill} 
              className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-200 text-xs md:text-sm font-medium rounded-full border border-purple-600/30 shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-500/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const teamData = [
  {
    category: "President",
    title: "Shreyash Dubey",
    src: "/President.JPG",
    content: (
      <MemberBio
        role="President"
        bio="Shreyash leads our MERN community with strategic vision and technical expertise. He architects our backend systems and guides the team towards innovative solutions."
        skills={["Leadership", "MongoDB", "Node.js", "Express", "Strategic Planning", "Team Management"]}
      />
    ),
  },
  {
    category: "Vice President",
    title: "Arushi Puri",
    src: "/Vice-President.JPG",
    content: (
      <MemberBio
        role="Vice President"
        bio="Arushi crafts stunning UIs with React and modern design principles. She transforms complex ideas into intuitive user experiences that users love."
        skills={["React", "UI/UX Design", "JavaScript", "Frontend Architecture", "User Experience"]}
      />
    ),
  },
  {
    category: "Operations Manager",
    title: "Mohd. Ashhar Khan",
    src: "/Operations Manager Mohd. Ashhar Khan.jpg",
    content: (
      <MemberBio
        role="Operations Manager"
        bio="Ashhar is our full-stack operations guru, seamlessly managing both technical and administrative aspects. He handles deployment, CI/CD pipelines, and team coordination."
        skills={[
          "Full-Stack Development",
          "DevOps",
          "Project Management",
          "Team Coordination",
          "CI/CD",
          "Operations"
        ]}
      />
    ),
  },
  {
    category: "Operations Manager",
    title: "Anubhav",
    src: "/Operations Manager Anubhav.jpg",
    content: (
      <MemberBio
        role="Operations Manager"
        bio="Anubhav ensures our code quality and operational efficiency. He focuses on testing, debugging, and maintaining high standards across all our projects."
        skills={["Quality Assurance", "Testing", "Debugging", "Code Review", "Process Optimization"]}
      />
    ),
  },
  {
    category: "Technical Team Lead",
    title: "Harsh Srivastava",
    src: "/Technical Team Lead.jpg",
    content: (
      <MemberBio
        role="Technical Team Lead"
        bio="Harsh leads our technical initiatives with deep expertise in system architecture and development best practices. He mentors the team and ensures technical excellence."
        skills={["System Architecture", "Technical Leadership", "Code Review", "Best Practices", "Mentoring", "Innovation"]}
      />
    ),
  },
  {
    category: "Content Lead",
    title: "Arya",
    src: "/Content Lead Arya.jpg",
    content: (
      <MemberBio
        role="Content Lead"
        bio="Arya manages our content strategy and creative direction. She ensures all our communications and materials align with our brand voice and mission."
        skills={["Content Strategy", "Creative Direction", "Brand Management", "Communication", "Content Creation"]}
      />
    ),
  },
  {
    category: "Social Media Lead",
    title: "Shreyas",
    src: "/Social Media Lead Shreyas.jpg",
    content: (
      <MemberBio
        role="Social Media Lead"
        bio="Shreyas builds our digital presence and community engagement. He creates meaningful connections through strategic social media management and community building."
        skills={["Social Media Strategy", "Community Management", "Content Creation", "Analytics", "Brand Building", "Digital Marketing"]}
      />
    ),
  },
  {
    category: "Design Lead",
    title: "Sai",
    src: "/Design Lead Sai.jpg",
    content: (
      <MemberBio
        role="Design Lead"
        bio="Sai brings our ideas to life with stunning visual designs and user experiences. He creates memorable brand experiences that resonate with our audience."
        skills={["UI/UX Design", "Visual Design", "Brand Identity", "Prototyping", "Design Systems", "Creative Direction"]}
      />
    ),
  },
  {
    category: "Event Lead",
    title: "Dhruv",
    src: "/Event Lead Dhruv.jpg",
    content: (
      <MemberBio
        role="Event Lead"
        bio="Dhruv orchestrates unforgettable events and experiences for our community. He brings people together through innovative and engaging activities."
        skills={["Event Planning", "Community Building", "Logistics", "Creative Direction", "Team Coordination", "Event Management"]}
      />
    ),
  },
  {
    category: "Student Coordinator",
    title: "Lavanya",
    src: "/Student Coordinator Lavanya.jpg",
    content: (
      <MemberBio
        role="Student Coordinator"
        bio="Lavanya advocates for student needs and ensures our initiatives align with the student community. She fosters growth and learning opportunities for all members."
        skills={["Student Advocacy", "Community Outreach", "Program Development", "Mentoring", "Leadership", "Student Engagement"]}
      />
    ),
  },
];