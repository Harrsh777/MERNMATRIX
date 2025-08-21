"use client"
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MERNLoadingPage from '../loading';
import HomePage from '../page';


const LoadingWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only show loading on the home page
    if (pathname === '/') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  // Store loading state in sessionStorage to prevent showing on back navigation
  useEffect(() => {
    const isFirstLoad = sessionStorage.getItem('isFirstLoad');
    
    if (!isFirstLoad) {
      sessionStorage.setItem('isFirstLoad', 'true');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading && pathname === '/') {
    return <MERNLoadingPage />;
  }

  return <HomePage />;
};

export default LoadingWrapper;