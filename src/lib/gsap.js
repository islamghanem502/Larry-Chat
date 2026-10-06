import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, CustomEase, useGSAP);

CustomEase.create('stamp', 'M0,0 C0.2,0 0.3,1.35 0.55,1.1 0.7,0.95 0.8,1 1,1');
CustomEase.create('soft', 'M0,0 C0.25,0.1 0.2,1 1,1');

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Arabic letters join, so text is only ever split into words, never characters.
export const splitWords = (el, opts = {}) => SplitText.create(el, { type: 'words', wordsClass: 'w', ...opts });

export { gsap, ScrollTrigger, SplitText, useGSAP };
