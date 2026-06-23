// Central GSAP setup: register plugins once, expose motion helpers.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Premium ease: exponential ease-out, no bounce.
export const EASE = 'expo.out';
export const EASE_SOFT = 'power3.out';

// Honor reduced-motion + coarse-pointer (mobile) for heavy effects.
const mq = (q) => typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia(q)
  : { matches: false, addEventListener() {}, removeEventListener() {} };

export const reducedMotion = () => mq('(prefers-reduced-motion: reduce)').matches;
export const motionOK = () => !reducedMotion();
export const isTouch = () => mq('(pointer: coarse)').matches;

// Heavy effects (WebGL backdrop, custom cursor) only on capable, non-reduced setups.
export const heavyFX = () => motionOK() && !isTouch();

export { gsap, ScrollTrigger, SplitText };
