import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './allProducts.css';

interface Flavor {
  img_url: string;
  flavor_name: string;
  flavor_id: number;
}

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  weight: string;
  cate_id: number;
  nutrition_facts: string;
  'size&servings': string;
  how_to_use: string;
  warnings: string;
  bio_for_topSellers: string;
  bio_for_ourProducts: string;
  unique_img: string;
  category_name: string;
  flavors: Flavor[];
}

const categories = ["ALL", "PROTEINS", "RECOVERY", "VITAMINS", "ENERGY"];

export default function AllProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('https://wegon-nutrition.com/APIs/get_all_products.php');
        const result = await response.json();
        if (result.success && result.data) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error('Error fetching all products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const getScaleFromWeight = (weight: string) => {
    if (!weight) return 1;
    
    // استخراج الرقم من النص (مثلاً "2.27KG" تصبح 2.27)
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) return 1;

    // تحويل كل الأوزان لجرام لتوحيد المقارنة
    const isKg = weight.toLowerCase().includes('kg');
    const grams = isKg ? numericWeight * 1000 : numericWeight;

    // تحديد النطاق: أصغر وزن 300 جرام وأكبر وزن 5000 جرام
    // السكيل سيتراوح بين 0.7 للعلب الصغيرة و 1.05 للكبيرة جداً
    const minGrams = 300;
    const maxGrams = 5000;
    const minScale = 0.8;
    const maxScale = 2;

    let scale = minScale + ((grams - minGrams) * (maxScale - minScale) / (maxGrams - minGrams));
    
    // حصر القيمة بين مينيوم وماكسيموم لضمان جمالية التصميم
    return Math.min(Math.max(scale, 0.65), 1.1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(product => product.category_name === activeCategory);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.5, type: 'spring', bounce: 0.4 } 
    }
  };

  return (
    <section className="all-products-page">
      <div className="all-products-hero">
        <motion.h1 
          className="all-products-main-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          OUR PREMIUM COLLECTION
        </motion.h1>
        <motion.p
          className="all-products-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover excellence in every serving. Engineered for your peak performance.
        </motion.p>
      </div>

      <div className="all-products-container">
        <div className="ap-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ap-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="ap-loading-state">
            <div className="ap-spinner"></div>
            <p>Loading Collection...</p>
          </div>
        ) : (
          <motion.div 
            className="ap-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => {
                const imgSource = product.unique_img || (product.flavors && product.flavors.length > 0 ? product.flavors[0].img_url : '');

                const baseScale = getScaleFromWeight(product.weight);

                return (
                  <motion.div 
                    layout
                    key={product.id} 
                    className="ap-card"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <div className="ap-image-wrapper">
                      {product.flavors && product.flavors.length > 0 ? (
                        <Swiper
                          modules={[Autoplay, EffectFade]}
                          effect="fade"
                          fadeEffect={{ crossFade: true }}
                          autoplay={{
                            delay: 2500 + Math.random() * 1000,
                            disableOnInteraction: false,
                          }}
                          loop={true}
                          className="ap-image-swiper"
                          allowTouchMove={false}
                        >
                          {product.flavors.map((flavor, index) => (
                            <SwiperSlide key={`${product.id}-${index}`}>
                              <motion.img
                                src={flavor.img_url}
                                alt={`${product.name} - ${flavor.flavor_name}`}
                                className="ap-image"
                                initial={{ scale: baseScale }}
                                animate={{ scale: baseScale }}
                                variants={{
                                  hover: { scale: baseScale * 1.08, transition: { duration: 0.4 } }
                                }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        imgSource ? (
                          <motion.img 
                            src={imgSource} 
                            alt={product.name}
                            className="ap-image"
                            initial={{ scale: baseScale }}
                            animate={{ scale: baseScale }}
                            variants={{
                              hover: { scale: baseScale * 1.08, transition: { duration: 0.4 } }
                            }}
                          />
                        ) : (
                          <div className="ap-no-image">No Image</div>
                        )
                      )}
                      
                      {/* Category Badge overlay */}
                      <span className="ap-category-badge">{product.category_name}</span>
                    </div>

                    <div className="ap-content">
                      <div className="ap-info">
                        <h2 className="ap-name">{product.name}</h2>
                        <span className="ap-weight">{product.weight || product.bio_for_ourProducts}</span>
                      </div>
                      
                      <button 
                        className="ap-view-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        VIEW PRODUCT
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
