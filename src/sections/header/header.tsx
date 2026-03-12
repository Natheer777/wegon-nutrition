import { useState, useEffect } from 'react'
import './header.css'
import img1 from '../../assets/Asset 6.png'
import img2 from '../../assets/Asset 7.png'
import img3 from '../../assets/Asset 8.png'
import img4 from '../../assets/Asset 9.png'

export default function header() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [img1, img2, img3, img4]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])





  return (
    <div className="header-slider">
      <div className="slider-container">
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

     
      
      </div>

    </div>
  )
}
