import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaGithub, FaDiscord, FaYoutube, FaInstagram, FaArrowRight, FaUsers, FaCode, FaRocket } from 'react-icons/fa';

interface SocialPlatform {
  id: number;
  name: string;
  icon: React.ReactNode;
  followers: string;
  description: string;
  color: string;
  gradient: string;
  link: string;
}

const CommunitySection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const socialPlatforms: SocialPlatform[] = [
    {
      id: 1,
      name: 'GitHub',
      icon: <FaGithub />,
      followers: '2.4K+ Stars',
      description: 'Open source projects & code',
      color: '#6cc644',
      gradient: 'from-green-400 to-emerald-500',
      link: '#'
    },
    {
      id: 2,
      name: 'Discord',
      icon: <FaDiscord />,
      followers: '1.8K+ Members',
      description: 'Real-time developer chat',
      color: '#7289DA',
      gradient: 'from-blue-400 to-indigo-500',
      link: '#'
    },
    {
      id: 3,
      name: 'YouTube',
      icon: <FaYoutube />,
      followers: '1.2K+ Subscribers',
      description: 'Tutorials & workshops',
      color: '#FF0000',
      gradient: 'from-red-400 to-pink-500',
      link: '#'
    },
    {
      id: 4,
      name: 'Instagram',
      icon: <FaInstagram />,
      followers: '3.1K+ Followers',
      description: 'Daily tips & updates',
      color: '#E1306C',
      gradient: 'from-pink-400 to-rose-500',
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, y: -10 }
  };

  return (
    <div 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(10, 1, 24, 0.95) 0%, rgba(26, 11, 46, 0.95) 50%, rgba(10, 1, 24, 0.95) 100%),
          url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.span
              animate={{
                boxShadow: ['0 0 0px rgba(203,195,227,0)', '0 0 20px rgba(203,195,227,0.3)', '0 0 0px rgba(203,195,227,0)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="inline-block px-4 py-2 text-sm font-semibold text-[#CBC3E3] bg-[#A020F0]/20 rounded-full mb-6 border border-[#CBC3E3]/30"
            >
              THE MERN COMMUNITY
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-[#F0F0F0]">Join Our</span>
              <br />
              <span 
                className="bg-gradient-to-r from-[#A020F0] via-[#CBC3E3] to-[#A020F0] bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease-in-out infinite'
                }}
              >
                MERN Matrix
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-[#E0E0E0] max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Connect with <span className="text-[#CBC3E3] font-semibold">2,400+ developers</span> building amazing projects with MongoDB, Express, React, and Node.js
            </motion.p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#A020F0] mb-2">2.4K+</div>
              <div className="text-[#CBC3E3]">Active Developers</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#A020F0] mb-2">150+</div>
              <div className="text-[#CBC3E3]">Projects Built</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#A020F0] mb-2">24/7</div>
              <div className="text-[#CBC3E3]">Community Support</div>
            </motion.div>
          </motion.div>

          {/* Social Platforms Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {socialPlatforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(platform.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className="relative bg-[#0A0118]/80 backdrop-blur-sm border border-[#1E0345] rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#CBC3E3]/50 hover:bg-[#0A0118]/90">
                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${platform.gradient}`}
                  />
                  
                  {/* Platform Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#1E0345] to-[#0A0118] flex items-center justify-center text-3xl border border-[#CBC3E3]/20"
                    style={{ color: platform.color }}
                  >
                    {platform.icon}
                  </motion.div>

                  {/* Platform Info */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold text-[#F0F0F0] mb-2">{platform.name}</h3>
                    <p className="text-[#CBC3E3] text-sm mb-3">{platform.description}</p>
                    <div className="text-2xl font-bold mb-4" style={{ color: platform.color }}>
                      {platform.followers}
                    </div>
                    
                    {/* Follow Button */}
                    <motion.a
                      href={platform.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${platform.gradient} hover:shadow-lg hover:shadow-${platform.color}/25`}
                    >
                      Follow
                      <FaArrowRight className="text-sm" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Join MERN Matrix Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(160, 32, 240, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-[#A020F0] to-[#8B5CF6] text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:from-[#8B5CF6] hover:to-[#A020F0] shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <FaUsers className="text-2xl" />
                <span>Join MERN Matrix</span>
                <FaArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              
              {/* Button Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#A020F0] to-[#8B5CF6] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-[#CBC3E3] text-lg">
              Ready to build the future? <span className="text-[#A020F0] font-semibold">Join thousands of developers</span> in our community
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default CommunitySection;