import './topSellers.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

interface Product {
  id: number;
  name: string;
  unique_img: string;
  bio_for_topSellers: string;
}

export default function TopSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await fetch("https://wegon-nutrition.com/APIs/get_all_products.php");
        const result = await response.json();
        if (result.success && result.data) {
          // التصفية للمنتجات التي لديها unique_img فقط
          const filtered = result.data.filter((p: any) => p.unique_img && p.unique_img.trim() !== "");
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching top sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="top-sellers-section" id="top-sellers">
      <div className="top-sellers-container">
        <div className="top-sellers-header">
          <motion.h2
            className="top-sellers-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            TOP SELLERS
          </motion.h2>

          <div className="top-sellers-nav">
            <button className="nav-btn prev-btn" aria-label="Previous slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pagination-numbers">
              {products.map((p, index) => (
                <span
                  key={p.id}
                  className={`page-num ${index === activeIndex ? 'active' : ''}`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
            <button className="nav-btn next-btn" aria-label="Next slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "100px 0", textAlign: "center", fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", color: "var(--color-main, #009dac)" }}>
            Loading Top Sellers...
          </div>
        ) : (
          <motion.div
            className="products-grid-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: '.prev-btn',
                nextEl: '.next-btn',
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={products.length > 4}
              spaceBetween={20}
              slidesPerView={1.2}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              breakpoints={{
                480: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
                1440: { slidesPerView: 4, spaceBetween: 50 },
              }}
              className="top-sellers-swiper"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    className="product-card"
                    variants={itemVariants}
                    whileHover={{ y: -15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="product-image-container">
                      <motion.img
                        src={product.unique_img}
                        alt={product.name}
                        className="product-image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-subtitle">{product.bio_for_topSellers}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  )
}

