import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-semibold"
      >
        Olmé — Cocktail Bar
      </motion.h1>
    </main>
  );
}
