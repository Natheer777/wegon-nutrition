import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import './ourProducts.css'

const categories = ["PROTEINS", "RECOVERY", "VITAMINS", "ENERGY"]

export interface Flavor {
    img_url: string;
    flavor_name: string;
    flavor_id: number;
}

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    weight: string;
    cate_id: number;
    nutrition_facts: string;
    "size&servings": string;
    how_to_use: string;
    warnings: string;
    bio_for_topSellers: string;
    bio_for_ourProducts: string;
    unique_img: string;
    category_name: string;
    flavors: Flavor[];
}

export default function OurProducts() {
    const [activeCategory, setActiveCategory] = useState("PROTEINS")
    const [allProducts, setAllProducts] = useState<ProductResponse[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://wegon-nutrition.com/APIs/get_all_products.php")
                const result = await response.json()
                if (result.success && result.data) {
                    setAllProducts(result.data)
                }
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const handleCategoryChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (categories.includes(customEvent.detail)) {
                setActiveCategory(customEvent.detail);
            }
        };
        window.addEventListener('changeProductCategory', handleCategoryChange);
        return () => window.removeEventListener('changeProductCategory', handleCategoryChange);
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
        // السكيل سيتراوح بين 0.65 للعلب الصغيرة و 1.1 للكبيرة جداً
        const minGrams = 300;
        const maxGrams = 5000;
        const minScale = 0.8;
        const maxScale = 2;

        let scale = minScale + ((grams - minGrams) * (maxScale - minScale) / (maxGrams - minGrams));

        // حصر القيمة بين مينيوم وماكسيموم لضمان جمالية التصميم
        return Math.min(Math.max(scale, 0.65), 1.1);
    };

    const filteredProducts = allProducts.filter(
        (product) => product.category_name === activeCategory
    )

    return (
        <section className="our-products-section" id="products">
            <div className="our-products-container">
                <motion.div
                    className="our-products-header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="our-products-title">OUR PRODUCT</h2>
                    <div className="categories-list">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {loading ? (
                    <div style={{ padding: "50px 0", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "1.5rem", color: "var(--color-main, #009dac)" }}>
                        Loading Products...
                    </div>
                ) : (
                    <motion.div layout className="products-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    className="our-product-card"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 157, 172, 0.2)" }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="our-product-image-wrapper">
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
                                                className="our-product-swiper"
                                                allowTouchMove={false}
                                            >
                                                {product.flavors.map((flavor, index) => {
                                                    const baseScale = getScaleFromWeight(product.weight);
                                                    return (
                                                        <SwiperSlide key={`${product.id}-${index}`}>
                                                            <motion.img
                                                                src={flavor.img_url}
                                                                alt={`${product.name} - ${flavor.flavor_name}`}
                                                                initial={{ scale: baseScale }}
                                                                animate={{ scale: baseScale }}
                                                                whileHover={{ scale: baseScale * 1.05 }}
                                                                transition={{ duration: 0.4 }}
                                                            />
                                                        </SwiperSlide>
                                                    );
                                                })}
                                            </Swiper>
                                        ) : (
                                            <motion.img
                                                src={product.unique_img || ''}
                                                alt={product.name}
                                                initial={{ scale: getScaleFromWeight(product.weight) }}
                                                animate={{ scale: getScaleFromWeight(product.weight) }}
                                                whileHover={{ scale: getScaleFromWeight(product.weight) * 1.05 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                        )}
                                    </div>
                                    <div className="our-product-info">
                                        <h3 className="our-product-name">{product.name}</h3>
                                        <p className="our-product-bio">{product.bio_for_ourProducts}</p>
                                    </div>
                                    <button className="read-more-btn">
                                        read more
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
