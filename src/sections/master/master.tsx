import './master.css'
import imageTopMaster from '../../assets/Asset 23@4x.png'
import masterimg from '../../assets/new1.png'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Master() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <section className="master-section" ref={ref} id="master">
      <div className="master-container">
        <motion.div 
          className="master-top-image-wrapper"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <img src={imageTopMaster} alt="Master Top" className="master-top-image" />
        </motion.div>

        <motion.div
          className="master-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header Section */}
          <motion.div className="master-header" variants={itemVariants}>
            <h1 className="master-title">MASTER YOUR MINDSET</h1>
            <h2 className="master-subtitle">COMMAND YOUR MUSCLE</h2>
          </motion.div>

          {/* Description */}
          <motion.div className="master-description-wrapper" variants={itemVariants}>
            <p className="master-description">
              Built by experts, proven in the gym. Every WEGON formula is
              meticulously crafted with pure, high-performance ingredients
              to ensure you hit your peak every single day.
              Trusted by dedicated athletes who demand transparency and
              results. We don't just provide supplements; we provide the
              foundation for your next evolution.
            </p>
          </motion.div>

          {/* Why Section Title */}
          <motion.div className="master-why-title" variants={itemVariants}>
            <h2 className="why-text-top">WHY YOU SHOULD TAKE</h2>
            <h2 className="why-text-bottom">WEGON CREATINE</h2>
          </motion.div>

          {/* Product Section */}
          <motion.div
            className="master-product-section"
            variants={itemVariants}
          >
            <motion.div
              className="product-image-container"
              animate={floatingAnimation}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={masterimg}
                alt="Wegon Creatine Benefits"
                className="product-image-composition"
              />

              {/* Optional: Add ripples or glow behind the image for more pop */}
              <div className="product-glow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
