import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './detailsProducts.css';

interface Flavor {
  flavor_id: number;
  flavor_name: string;
  img_url: string;
}

interface ProductDetails {
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

export default function DetailsProducts() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        // Use ID from URL parameters, or fallback to '1' for testing
        formData.append('product_id', id || '1');

        const response = await fetch('https://wegon-nutrition.com/APIs/get_product_by_id.php', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          setProduct(result.data);
          setSelectedFlavorIndex(0); // Reset selection when new product loads
        } else {
          setError(result.message || 'Failed to fetch product data.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const getScaleFromWeight = (weight: string) => {
    if (!weight) return 1;

    // استخراج الرقم من النص (مثلاً "2.27KG" تصبح 2.27)
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight)) return 1;

    // تحويل كل الأوزان لجرام لتوحيد المقارنة
    const isKg = weight.toLowerCase().includes('kg');
    const grams = isKg ? numericWeight * 1000 : numericWeight;

    // تحديد النطاق: أصغر وزن 300 جرام وأكبر وزن 5000 جرام
    // السكيل سيتراوح بين 0.65 للعلب الصغيرة و 1.2 للكبيرة جداً
    const minGrams = 300;
    const minScale = 0.8;

    let scale = minScale + ((grams - minGrams) * (1.2) / (4700));

    // حصر القيمة بين مينيوم وماكسيموم لضمان جمالية التصميم
    return Math.min(Math.max(scale, 0.65), 1.2);
  };

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Loading Product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="details-error">
        <p>{error || 'Product not found.'}</p>
      </div>
    );
  }

  // Determine which image to show based on selected flavor or fallback to unique_img
  const currentImageUrl =
    product.flavors && product.flavors.length > 0
      ? product.flavors[selectedFlavorIndex].img_url
      : product.unique_img;

  // Format text arrays by splitting on newlines
  const formatText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  return (
    <section className="details-section">
      <div className="details-container">
        
        {/* Product Image Area */}
        <motion.div 
          className="details-image-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {product.flavors && product.flavors.length > 0 ? (
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={product.category_name === "VITAMINS" ? {
                delay: 3000,
                disableOnInteraction: false,
              } : false}
              loop={true}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setSelectedFlavorIndex(swiper.realIndex)}
              className="details-product-swiper"
            >
              {product.flavors.map((flavor, index) => {
                const baseScale = getScaleFromWeight(product.weight);
                return (
                  <SwiperSlide key={`${product.id}-${index}`}>
                    <motion.img 
                      src={flavor.img_url} 
                      alt={`${product.name} - ${flavor.flavor_name}`} 
                      className="details-product-img"
                      initial={{ scale: baseScale * 0.9, opacity: 0 }}
                      animate={{ scale: baseScale, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            currentImageUrl ? (
              <motion.img 
                src={currentImageUrl} 
                alt={product.name} 
                className="details-product-img"
                key={currentImageUrl}
                initial={{ scale: getScaleFromWeight(product.weight) * 0.9, opacity: 0 }}
                animate={{ scale: getScaleFromWeight(product.weight), opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ) : (
              <div className="details-image-placeholder">No Image Available</div>
            )
          )}
        </motion.div>

        {/* Product Info Area */}
        <motion.div 
          className="details-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
            }
          }}
        >
          {/* Header Row: Name & Weight */}
          <motion.div 
            className="details-header-row"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <h1 className="details-title">{product.name}</h1>
            <span className="details-weight">{product.weight || product.bio_for_ourProducts}</span>
          </motion.div>

          {/* Flavors Row - Hidden for VITAMINS as requested */}
          {product.category_name !== "VITAMINS" && product.flavors && product.flavors.length > 0 && (
            <motion.div 
              className="details-flavors-row"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <span className="details-flavors-label">Available Flavors</span>
              <div className="details-flavors-select-wrapper">
                <select 
                  className="details-flavors-select"
                  value={selectedFlavorIndex}
                  onChange={(e) => {
                    const index = Number(e.target.value);
                    setSelectedFlavorIndex(index);
                    swiperInstance?.slideToLoop(index);
                  }}
                >
                  {product.flavors.map((flavor, index) => (
                    <option key={index} value={index}>
                      {flavor.flavor_name}
                    </option>
                  ))}
                </select>
                <span className="flavors-count">({product.flavors.length})</span>
              </div>
            </motion.div>
          )}

          <div className="details-cards-grid">
            {/* 2-Column Info: Nutrition & Size/Servings Card */}
            <motion.div 
              className="details-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 157, 172, 0.15)" }}
            >
              <div className="details-info-columns">
                <div className="info-column">
                  <h2 className="info-column-title">Nutrition Facts</h2>
                  <div className="info-column-text">
                    {formatText(product.nutrition_facts)}
                  </div>
                </div>
                
                <div className="info-column-divider"></div>

                <div className="info-column">
                  <h2 className="info-column-title">Size / Servings</h2>
                  <div className="info-column-text">
                    {formatText(product['size&servings'])}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div 
              className="details-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 157, 172, 0.15)" }}
            >
              <h2 className="section-heading">DESCRIPTION</h2>
              <p className="section-body">{formatText(product.description)}</p>
            </motion.div>

            {/* How to Use Card */}
            <motion.div 
              className="details-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 157, 172, 0.15)" }}
            >
              <h2 className="section-heading">HOW TO USE</h2>
              <p className="section-body">{formatText(product.how_to_use)}</p>
            </motion.div>

            {/* Warnings Card (if exists) */}
            {product.warnings && (
              <motion.div 
                className="details-card warnings-card"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(209, 58, 58, 0.15)" }}
              >
                <h2 className="section-heading warnings-heading">WARNINGS</h2>
                <p className="section-body">{formatText(product.warnings)}</p>
              </motion.div>
            )}
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
