import { motion } from 'framer-motion';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Top Section - Contact Information */}
            <div className="footer-top">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="footer-contact-title">CONTACT</h2>
                    <div className="title-underline"></div>

                    <div className="footer-info">
                        {/* Address */}
                        <div className="info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>
                                8a Pop In Business Centre, South Way,<br />
                                Wembley, United Kingdom, HAO 9HF
                            </span>
                        </div>

                        {/* Email */}
                        <div className="info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <a href="mailto:SupportTeam@wegon-nutrition.com">SupportTeam@wegon-nutrition.com</a>
                        </div>

                        {/* Instagram Link */}
                        <div className="info-item mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <a href="https://wegon-nutrition.com" target="_blank" rel="noopener noreferrer">@wegon-nutrition.com</a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Section - Legal & Copyright */}
            <motion.div
                className="footer-bottom"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="bottom-content">
                    <p className="copyright">© 2026 Get WEGON Nutrition.</p>
                    <p className="disclaimer">
                        These statements have not been evaluated by the Federal Drug Administration.
                        These products are not intended to diagnose, treat, cure, or prevent any disease.
                        Please, consult your physician. Testimonials and products reviews reflect individual
                        peoples unique experiences and opinions and should not be viewed as professional advice.
                        Individual results may vary.
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
