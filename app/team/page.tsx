import React from 'react'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Lead Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Full-stack wizard with 10+ years experience',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Creating beautiful, intuitive interfaces',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'DevOps Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Keeping our infrastructure running smoothly',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    role: 'Frontend Developer',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Turning designs into pixel-perfect reality',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Backend Architect',
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    bio: 'Building robust and scalable APIs',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
  {
    id: 6,
    name: 'Priya Patel',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    bio: 'Bridging business needs with technical solutions',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#'
    }
  },
    {
      id: 7,
      name: 'James Wilson',
      role: 'QA Engineer',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      bio: 'Ensuring our products meet the highest standards',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    // Add more members as needed
  ]
  
  export default function TeamPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-white">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFFFFF]">
            Our Team
          </h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Meet the talented individuals who make everything possible
          </p>
          
          <div className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="inline-flex gap-8 px-4">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="w-[280px] md:w-[320px] h-[480px] bg-gradient-to-b from-black/30 to-black/50 rounded-2xl backdrop-blur-md p-6 flex flex-col items-center justify-between border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 group"
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#FFD700] group-hover:scale-105 transition-transform duration-300">
                    <Image 
                      src={member.avatar} 
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#FFD700]">{member.name}</h3>
                    <p className="text-gray-300 mt-1">{member.role}</p>
                    <p className="text-sm text-gray-400 mt-3">{member.bio}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a href={member.social.github} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                      <FaGithub className="text-xl" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-[#FFD700] transition-colors">
                      <FaTwitter className="text-xl" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  