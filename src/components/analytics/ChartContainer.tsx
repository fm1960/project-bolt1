import React, { useEffect, useRef } from 'react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  width = '100%',
  height = '300px',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation effect when the chart comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`card opacity-0 ${className}`}
      style={{ width, minHeight: height }}
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;