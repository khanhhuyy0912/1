import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutPreviewSection } from '../components/sections/AboutPreviewSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { BlogPreviewSection } from '../components/sections/BlogPreviewSection';
import { ContactCtaSection } from '../components/sections/ContactCtaSection';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div id="home-page" className="space-y-0 animate-in fade-in duration-300">
      <HeroSection onNavigate={onNavigate} />
      <AboutPreviewSection onNavigate={onNavigate} />
      <SkillsSection />
      <ProjectsSection onNavigate={onNavigate} />
      <ExperienceSection />
      <TestimonialsSection />
      <BlogPreviewSection onNavigate={onNavigate} />
      <ContactCtaSection onNavigate={onNavigate} />
    </div>
  );
};
