"use client";
import { motion, MotionProps } from "framer-motion";
import React, { PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren &
  MotionProps;

const FramerComponent = ({
  children,
  className,
  viewport = {
    amount: 0.2,
    once: true,
  },
  whileInView = { opacity: 1, y: 0 },
  initial = { opacity: 0, y: 10 },
  transition = {
    type: "spring",
    bounce: 0.6,
    damping: 6,
    stiffness: 150,
    delay: 0.2,
  },
  ...props
}: Props) => {
  return (
    <motion.div className={className} initial={initial} whileInView={whileInView} transition={transition} viewport={viewport} {...props}>
      {children}
    </motion.div>
  );
};

export default FramerComponent;
