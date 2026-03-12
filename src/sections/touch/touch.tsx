import './touch.css'
import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Touch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 4000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="touch" className="touch-section">
      <motion.div
        className="touch-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="touch-header">
          <motion.h2 className="touch-title" variants={itemVariants}>
            KEEP IN TOUCH
          </motion.h2>
          <motion.p className="touch-subtitle" variants={itemVariants}>
            IF YOU HAVE ANY QUESTIONS OR NEED ASSISTANCE<br />
            SEND TO US A MESSAGE AND WE WILL GET<br />
            BACK TO YOU AS SOON AS POSSIBLE
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <h2>THANK YOU!</h2>
              <p className="touch-subtitle">Your message has been sent successfully.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="touch-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div className="form-field" variants={itemVariants}>
                <label htmlFor="name">YOUR NAME</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div className="form-field" variants={itemVariants}>
                <label htmlFor="email">YOUR EMAIL</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div className="form-field" variants={itemVariants}>
                <label htmlFor="message">YOUR MESSAGE</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="How can we help you?"
                />
              </motion.div>

              <motion.div className="submit-container" variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="touch-submit-btn"
                  whileHover={{ scale: 1.05, backgroundColor: "#00899b" }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEND MESSAGE
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
