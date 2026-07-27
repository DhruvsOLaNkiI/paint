import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Guarantees from '../components/Guarantees';
import Services from '../components/Services';
import TechFeatures from '../components/TechFeatures';
import BeforeAfter from '../components/BeforeAfter';
import SocialProof from '../components/SocialProof';
import Journey from '../components/Journey';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-slate-dark text-brand-offwhite font-sans antialiased selection:bg-brand-gold/20 selection:text-brand-offwhite">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Guarantees />
        <Services />
        <TechFeatures />
        <BeforeAfter />
        <SocialProof />
        <Journey />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
