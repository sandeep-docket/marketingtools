import { useEffect, useState } from 'react';
import './BlurText.css';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const BlurText = ({ text, className = '', delay = 0 }: BlurTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={`blur-text ${isVisible ? 'blur-text-visible' : ''} ${className}`}>
      {text}
    </span>
  );
};

export default BlurText;
