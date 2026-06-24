import { supabaseAdmin } from '@/lib/supabase';
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

export default async function LandingPage() {
  let countdownTarget: string | undefined;
  try {
    const { data } = await supabaseAdmin
      .from('config')
      .select('value')
      .eq('key', 'countdown_target')
      .maybeSingle();
    countdownTarget = data?.value ?? undefined;
  } catch {
    // config table may not exist yet — CountdownBar uses its built-in default
  }

  return (
    <>
      <CountdownBar targetISO={countdownTarget} />
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
      <StickyBuyBar targetISO={countdownTarget} />
    </>
  );
}
