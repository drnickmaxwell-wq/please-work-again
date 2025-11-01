import DigitalWorkflow from '@/components/sections/DigitalWorkflow';
import EquipmentGallery from '@/components/sections/EquipmentGallery';
import HeroLuxury from '@/components/sections/HeroLuxury';
import ServicesGrid from '@/components/sections/ServicesGrid';
import SmileJourney from '@/components/sections/SmileJourney';
import TechnologyStrip from '@/components/sections/TechnologyStrip';

export default function HomePage() {
  return (
    <main className="space-y-0">
      <HeroLuxury />
      <TechnologyStrip />
      <DigitalWorkflow />
      <EquipmentGallery />
      <ServicesGrid />
      <SmileJourney />
    </main>
  );
}
