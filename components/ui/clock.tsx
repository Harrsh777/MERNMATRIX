'use client';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { useEffect, useState } from 'react';

export function Clock() {
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes());
      setSeconds(new Date().getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center gap-2 font-mono text-6xl md:text-8xl font-bold text-white'>
      <SlidingNumber value={hours} padStart={true} />
      <span className='text-purple-300'>:</span>
      <SlidingNumber value={minutes} padStart={true} />
      <span className='text-purple-300'>:</span>
      <SlidingNumber value={seconds} padStart={true} />
    </div>
  );
}

export function CountdownTimer({ targetDate, size = 'large' }: { targetDate: Date; size?: 'large' | 'small' }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = targetDate.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const textSize = size === 'large' ? 'text-6xl md:text-8xl' : 'text-2xl md:text-3xl';
  const gapSize = size === 'large' ? 'gap-2' : 'gap-1';

  return (
    <div className={`flex items-center ${gapSize} font-mono ${textSize} font-bold text-white`}>
      <SlidingNumber value={timeLeft.hours} padStart={true} />
      <span className='text-purple-300'>:</span>
      <SlidingNumber value={timeLeft.minutes} padStart={true} />
      <span className='text-purple-300'>:</span>
      <SlidingNumber value={timeLeft.seconds} padStart={true} />
    </div>
  );
}
