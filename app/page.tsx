import CountdownBar from '@/components/landing/CountdownBar';
import Hero from '@/components/landing/Hero';
import TrustStrip from '@/components/landing/TrustStrip';
import Pain from '@/components/landing/Pain';
import Solution from '@/components/landing/Solution';
import Timeline from '@/components/landing/Timeline';
import Ingredients from '@/components/landing/Ingredients';
import VideoSection from '@/components/landing/VideoSection';
import Reviews from '@/components/landing/Reviews';
import Offer from '@/components/landing/Offer';
import LeadForm from '@/components/landing/LeadForm';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import StickyBuyBar from '@/components/landing/StickyBuyBar';

export default function LandingPage() {
  return (
    <>
      <CountdownBar />
      {/* Sentinel div used by StickyBuyBar IntersectionObserver */}
      <div className="hero-sentinel" />
      <Hero />
      <TrustStrip />
      <Pain />
      <Solution />
      <Timeline />
      <Ingredients />
      <VideoSection />
      <Reviews />
      <Offer />
      <LeadForm />
      <FAQ />
      <Footer />
      <ChatWidget />
      <StickyBuyBar />
    </>
  );
}
