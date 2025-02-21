import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { SlidersVertical } from "lucide-react"

interface FloatingToggleProps {
  isActive: boolean
  onChange?: any
}

const FloatingToggle: React.FC<FloatingToggleProps> = ({
  isActive,
  onChange,
}) => {
  const motionDivProps = useMemo(() => ({
  className: `${!isActive ? "opacity-100" : "opacity-0"} w-12 h-12 bg-primary fixed bottom-16 -right-5 md:bottom-8 md:right-8 rounded-full cursor-pointer flex items-center justify-center
        shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out z-[9999]`,
  animate: {
    opacity: !isActive ? 0.5 : 0,
  },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  }), [isActive]);

  return (
  <motion.div
    {...motionDivProps}
    onClick={onChange}
  >
    <SlidersVertical />
  </motion.div>
  )
}

export default FloatingToggle
