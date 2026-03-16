import './whoWeAre.css'
import logo from '../../assets/Asset 10@4x.png'
import imgWho2 from '../../assets/Asset 13@2x.png'
import imgWho1 from '../../assets/Asset 14@2x.png'
import imgWho3 from '../../assets/Asset 15@2x.png'
import imgWho4 from '../../assets/Asset 16@2x.png'
import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const TypingText = ({ text, className }: { text: string, className?: string }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < text.length) {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        } else {
          // Wait after finishing typing
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(text.slice(0, displayedText.length - 1))
        } else {
          setIsDeleting(false)
        }
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, isInView, text])

  return (
    <h1 ref={ref} className={className} style={{ minHeight: '1.2em' }}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{
          display: 'inline-block',
          width: '4px',
          height: '0.8em',
          backgroundColor: 'currentColor',
          marginLeft: '4px',
          verticalAlign: 'baseline'
        }}
      />
    </h1>
  )
}

interface GridItem {
  image: string;
  targetId?: string;
  navigateTo?: string;
  categoryTarget?: string;
}

const gridItems: GridItem[] = [
  {
    image: imgWho1,
    targetId: 'top-sellers'
  },
  {
    image: imgWho2,
    navigateTo: '/product/6'
  },
  {
    image: imgWho3,
    navigateTo: '/product/9'
  },
  {
    image: imgWho4,
    navigateTo: '/product/5'
  }
]

export default function WhoWeAre() {
  const navigate = useNavigate()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      y: [0, -20, 0],
      transition: {
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  }

  return (
    <section id="who-we-are" className="who-we-are-section">
      <div className="who-we-are-container">

        <header className="header-wrapper row">
          <motion.div
            className="header-text col-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
          >
            <div className="title-container">
              <TypingText text="WHO WE ARE ?" className="who-title" />
            </div>
            <p className="who-description">
              Wegon Nutrition is a uk-based health and fitness brand dedicated to redefining performance,
              we bridge the gap between high-quality science and athletic goals providing premium
              supplements designed for those who refuse to settle for anything but the best.
            </p>
          </motion.div>

          <motion.img
            src={logo}
            alt="Wegon Nutrition Logo"
            className="who-logo col-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={logoVariants}
          />
        </header>

        <motion.div
          className="who-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              className="grid-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (item.navigateTo) {
                  navigate(item.navigateTo);
                } else {
                  if (item.categoryTarget) {
                    window.dispatchEvent(new CustomEvent('changeProductCategory', { detail: item.categoryTarget }));
                  }
                  if (item.targetId) {
                    document.getElementById(item.targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              style={(item.targetId || item.navigateTo || item.categoryTarget) ? { cursor: 'pointer' } : undefined}
            >
              <img src={item.image} className="grid-image" />
              <div className="item-overlay">
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
