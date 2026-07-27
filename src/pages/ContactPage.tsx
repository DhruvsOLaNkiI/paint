import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-brand-offwhite font-sans antialiased selection:bg-brand-gold/20 selection:text-brand-offwhite">
      <Navigation />
      <main className="pt-[7.5rem]">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
