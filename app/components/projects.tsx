'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type PortfolioItem = {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  category?: string;
  description?: string;
};

const PortfolioGrid = () => {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Flatpur.com',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: 'https://www.flatpur.com',
      category: 'E-commerce',
      description: 'A modern Real-Estate startup with AI-powered recommendations'
    },
    {
      id: 2,
      title: 'SafeSurf',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com/Harrsh777/SafeSurfJr',
      category: 'Cybersecurity',
      description: 'Browser extension for real-time phishing protection'
    },
    {
      id: 3,
      title: 'Deplox',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com/Harrsh777/DeployX',
      category: 'DevOps',
      description: 'CI/CD automation platform for seamless deployments'
    },
    {
      id: 4,
      title: 'The Plotify.com',
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: 'https://www.theplotify.com',
      category: 'Freelance',
      description: 'A modern Real-Estate listing platform'
    },
    {
      id: 5,
      title: 'The MERN Stack Alchemist',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: 'https://www.harshsrivastava.in/book',
      category: 'Educational',
      description: 'Comprehensive guide to mastering full-stack development'
    },
    {
      id: 6,
      title: 'Supply Chain Management',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: 'https://sdpl.vercel.app/',
      category: 'Web Application',
      description: 'Biggest Distributon and Supply Chain Management Firm in Uttar Pradesh'
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-[#0A0118] to-black">
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A020F0]/20 text-[#C084FC] border border-[#A020F0]/30">
            Portfolio Showcase
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C084FC]"
        >
          My Digital Creations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#E0E0E0] max-w-3xl mx-auto"
        >
          Each project represents a unique challenge solved with innovative thinking and cutting-edge technology. 
          From sleek UIs to robust backends, explore my journey through code.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: item.id * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 border border-[#1E0345] hover:border-[#A020F0]/50 shadow-[#A020F0]/10"
          >
            <Link href={item.link}>
              <div className="aspect-[4/3] w-full h-full cursor-pointer relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0118] to-[#1E0345] flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      quality={90}
                    />
                  ) : (
                    <div className="text-center p-6">
                      <svg className="w-12 h-12 mx-auto text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#A0A0A0] mt-2 block">{item.title}</span>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-[#A020F0]/20 text-[#C084FC] border border-[#A020F0]/30 mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-[#E0E0E0] mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A020F0] hover:bg-[#C084FC] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <Link href="#" className="inline-flex items-center px-6 py-3 border border-[#1E0345] rounded-full text-sm font-medium text-white hover:bg-[#0A0118]/50 hover:border-[#A020F0] transition-all duration-300 group">
          View Full Portfolio
          <svg
            className="ml-2 h-4 w-4 text-[#C084FC] group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default PortfolioGrid;
