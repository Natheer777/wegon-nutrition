import { Header, Master, Navbar, TopSellers, Touch, WhoWeAre, Review, Footer } from '../../sections'
import { ScrollReveal } from '../../components/ScrollReveal'

export default function home() {
  return (
    <>
      <Navbar />

      <ScrollReveal>
        <Header />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <WhoWeAre />
      </ScrollReveal>

      <ScrollReveal>
        <TopSellers />
      </ScrollReveal>

      <ScrollReveal>
        <Master />
      </ScrollReveal>

      <ScrollReveal>
        <Touch />
      </ScrollReveal>

      <ScrollReveal>
        <Review />
      </ScrollReveal>

      <Footer />
    </>
  )
}

