import { useState, useEffect, useRef } from "react";

export function useAnimatedCounter(
  end: number,
  duration = 1500,
  shouldStart = true
) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;

    function step(timestamp: number) {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    }

    rafId.current = requestAnimationFrame(step);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [end, duration, shouldStart]);

  return count;
}
