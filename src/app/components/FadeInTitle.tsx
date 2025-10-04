"use client";
import { motion } from "motion/react";

export default function FadeInTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1, y:0}}>
      {children}
    </motion.h1>
  );
}
