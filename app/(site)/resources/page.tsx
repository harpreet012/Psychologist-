import SectionHeading from "@/components/SectionHeading";
import ResourcesList from "@/components/ResourcesList";
import BreathingExercise from "@/components/BreathingExercise";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Resources | ${siteConfig.name}`,
  description:
    "Mental wellness articles on anxiety, overthinking, burnout, relationships, academic stress, and self-compassion.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Resources"
            title="Notes on Mental Wellness"
            description="Short, practical reads on the things that show up most often in the therapy room — written to be genuinely useful, not just comforting."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-content">
          <ResourcesList />
        </div>
      </section>

      <section id="breathing" className="scroll-mt-24 bg-lavender-100/50 py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="A Small Pause"
            title="Try a Guided Breathing Exercise"
            description="A short, optional wellness exercise you can use anytime you need a moment to reset."
          />
          <div className="mt-10">
            <BreathingExercise />
          </div>
        </div>
      </section>
    </>
  );
}
