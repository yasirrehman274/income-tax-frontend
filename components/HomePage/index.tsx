import PublicHeader from '../layout/PublicHeader';
import HeroSection from './HeroSection';
import OtherTaxCalculators from './OtherTaxCalculators';
import ValueProposition from './ValueProposition';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import Testimonials from './Testimonials';
import ConsultationCTA from './ConsultationCTA';
import Footer from '../layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <PublicHeader />
      <HeroSection />
      <OtherTaxCalculators />
      <ValueProposition />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <ConsultationCTA />
      <Footer />
    </main>
  );
}
