/* app/ui/BottomTabs.tsx */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import TabsBar from "./TabsBar";
import { TABS } from "../data/content";

export default function BottomTabs({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="pointer-events-none fixed inset-x-0 z-[50]"
        >
          <div className="pointer-events-auto mx-auto max-w-[1280px] px-4">
            <div className="flex items-end justify-center gap-3">
              <TabsBar tabs={TABS} size="lg" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
