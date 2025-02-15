import { keyframes } from "@emotion/react";

interface SlideAnimationProps {
  from: string | number;
  to: string | number;
}

const formatValue = (value: string | number) => (typeof value === "number" ? `${value}rem` : value);

export const ANIMATION = {
  duration: {
    default: "0.3s",
  },
  fade: {
    in: keyframes`
     from {
       opacity: 0;
       visibility: hidden;
     }
     to {
       opacity: 1;
       visibility: visible;
     }
   `,
    out: keyframes`
     from {
       opacity: 1;
       visibility: visible;
     }
     to {
       opacity: 0;
       visibility: hidden;
     }
   `,
  },
  slide: {
    up: ({ from, to }: SlideAnimationProps) => keyframes`
     from {
       opacity: 0;
       transform: translateY(${formatValue(from)});
       visibility: hidden;
     }
     to {
       opacity: 1;
       transform: translateY(${formatValue(to)});
       visibility: visible;
     }
   `,
    down: ({ from, to }: SlideAnimationProps) => keyframes`
     from {
       opacity: 1;
       transform: translateY(${formatValue(from)});
       visibility: visible;
     }
     to {
       opacity: 0;
       transform: translateY(${formatValue(to)});
       visibility: hidden;
     }
   `,
    in: ({ from, to }: SlideAnimationProps) => keyframes`
     from {
       transform: translateX(${formatValue(from)});
       visibility: visible;
     }
     to {
       transform: translateX(${formatValue(to)});
       visibility: hidden;
     }
   `,
    out: ({ from, to }: SlideAnimationProps) => keyframes`
     from {
       transform: translateX(${formatValue(from)});
       visibility: hidden;
     }
     to {
       transform: translateX(${formatValue(to)});
       visibility: visible;
     }
   `,
  },
};
