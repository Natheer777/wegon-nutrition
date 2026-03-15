import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import './permiume.css'
import imgPremiume from '../../assets/Asset 4@2x.png'

const features = [
  {
    title: 'Proven Efficacy:',
    desc: 'Research-driven formulas for real results.',
  },
  {
    title: 'Tailored Solutions:',
    desc: 'Formulated for your active lifestyle.',
  },
  {
    title: 'Clean Label:',
    desc: 'Full transparency. No hidden ingredients.',
  },
  {
    title: 'Unmatched Value:',
    desc: 'Premium quality at an accessible price.',
  },
]

export default function Permiume() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="premium-section" ref={ref}>
      <div className="premium-container">
        {/* Image Column */}
        <motion.div
          className="premium-image-col"
          initial={{ opacity: 0, x: -40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
        >
          <img src={imgPremiume} alt="Premium Nutrition Products" className="premium-image" />
        </motion.div>

        {/* Content Column */}
        <motion.div
          className="premium-content-col"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 variants={itemVariants} className="premium-title ">
            DISCOVER THE POWER OF <br className="premium-title-break" />
            PREMIUM NUTRITION
          </motion.h2>

          <div className="premium-features">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="premium-feature-item"
                whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.2 } }}
              >
                <span className="premium-feature-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: 'inline', marginRight: '6px', verticalAlign: '-4px' }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature.title}
                </span>{' '}
                <span className="premium-feature-desc">{feature.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
