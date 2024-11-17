import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';
import { PopularRoutes } from '@/components/sections/popular-routes';
import { Reviews } from '@/components/sections/reviews';
import { Partners } from '@/components/sections/partners';
import { DownloadApp } from '@/components/sections/download-app';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturesSection />
      <PopularRoutes />
      <Reviews />
      <Partners />
      <DownloadApp />
    </div>
  );
}