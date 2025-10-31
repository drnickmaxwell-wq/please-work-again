import HeroLuxury from '@/components/sections/HeroLuxury';
import ServicesGrid from '@/components/sections/ServicesGrid';
import SmileJourney from '@/components/sections/SmileJourney';

export default function HomePage() {
  return (
    <main className="space-y-0">
      <HeroLuxury />
      <ServicesGrid />
      <SmileJourney />
    </main>
  );
}
