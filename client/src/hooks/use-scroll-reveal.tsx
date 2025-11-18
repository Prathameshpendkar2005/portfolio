import { useEffect, useRef } from 'react';

/**
 * Hook to add smooth scroll reveal animations to elements
 * Elements fade in and slide up when scrolled into view
 */
export function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class when element enters viewport
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.add('animate-slide-in');
          
          // Optional: stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return ref;
}

/**
 * Hook to add staggered animations to a list of elements
 */
export function useStaggerAnimation(selector: string, delay: number = 100) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      htmlElement.style.animation = `fadeInUp ${0.6 + index * 0.1}s ease-out forwards`;
      htmlElement.style.animationDelay = `${index * delay}ms`;
    });
  }, [selector, delay]);
}
