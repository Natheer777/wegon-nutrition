import './review.css'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const reviews = [
    {
        id: 1,
        title: 'Beast product',
        text: 'The product fulfills all its purpose to capacity',
        name: 'Alex T.',
        date: '4 months ago',
        verified: true,
    },
    {
        id: 2,
        title: 'Amazing Energy',
        text: 'Highly recommended for anyone looking for high quality products.',
        name: 'Sarah J.',
        date: '2 months ago',
        verified: true,
    },
    {
        id: 3,
        title: 'Great Taste',
        text: 'One of the best tasting protein shakes I have ever tried.',
        name: 'Michael R.',
        date: '1 month ago',
        verified: true,
    },
    {
        id: 4,
        title: 'Fast Shipping',
        text: 'Ordered on Monday, arrived on Wednesday. Excellent service!',
        name: 'Emily D.',
        date: '3 weeks ago',
        verified: true,
    }
]

const StarIcon = () => (
    <svg className="star-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
)

const VerifiedIcon = () => (
    <svg className="verified-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
)

export default function Review() {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <section id="reviews" className="review-section">
            <motion.div
                className="review-header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.h2 className="review-title" variants={itemVariants}>
                    REVIEWS FROM <span>OUR HAPPY CUSTOMERS</span>
                </motion.h2>
            </motion.div>

            <motion.div
                className="reviews-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="reviews-swiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <motion.div className="review-card" variants={itemVariants}>
                                <div className="review-image-placeholder">
                                    {/* Image would go here */}
                                </div>
                                <div className="review-content">
                                    <div className="review-top">
                                        <div className="review-stars">
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                            <StarIcon />
                                        </div>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <div className="review-body">
                                        <h3 className="review-card-title">{review.title}</h3>
                                        <p className="review-text">{review.text}</p>
                                    </div>
                                    <div className="review-footer">
                                        <span className="reviewer-name">{review.name}</span>
                                        {review.verified && (
                                            <div className="verified-badge">
                                                <VerifiedIcon />
                                                <span>Verified buyer</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    )
}
