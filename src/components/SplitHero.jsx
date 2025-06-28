import React from 'react';
import { motion } from 'framer-motion';

export default function SplitHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <motion.div
        className="flex justify-center items-center p-12 bg-white text-black"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-4xl font-bold">Creative Designer</h1>
          <p className="mt-4">Building stunning visual systems</p>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center items-center p-12 bg-black text-white"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-4xl font-bold">Web Developer</h1>
          <p className="mt-4">Crafting responsive web apps</p>
        </div>
      </motion.div>
    </section>
  );
}
