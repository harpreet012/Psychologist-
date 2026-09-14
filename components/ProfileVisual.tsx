import Image from "next/image";

interface ProfileVisualProps {
  compact?: boolean;
}

export default function ProfileVisual({ compact = false }: ProfileVisualProps) {
  return (
    <div
      className={`relative mx-auto w-full ${compact ? "max-w-sm" : "max-w-md"}`}
      aria-label="Portrait space for Anjali Jakhar"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-organic bg-gradient-to-br from-sage-200 via-cream-deep to-lavender-100 shadow-soft">
        <div className="absolute -left-10 top-16 h-40 w-40 rounded-full border border-white/60" />
        <div className="absolute -right-14 bottom-10 h-52 w-52 rounded-full bg-clay-100/70 blur-sm" />
        <div className="absolute inset-5 z-10 overflow-hidden rounded-organic-2 border border-white/60 bg-white/30 shadow-soft sm:inset-7">
          <Image
            src="/images/anjali-jakhar-portrait.jpeg"
            alt="Anjali Jakhar, Counselling Psychologist"
            fill
            sizes={compact ? "(max-width: 640px) 85vw, 384px" : "(max-width: 1024px) 85vw, 448px"}
            priority={!compact}
            className="object-cover object-[center_42%]"
          />
        </div>
        <svg
          viewBox="0 0 120 120"
          className="absolute bottom-5 left-5 h-24 w-24 text-sage-500/35"
          fill="none"
          aria-hidden="true"
        >
          <path d="M90 18C56 28 31 52 24 91" stroke="currentColor" strokeWidth="2" />
          <path d="M72 32C75 44 68 51 57 53C54 42 60 34 72 32Z" fill="currentColor" />
          <path d="M50 52C53 65 45 72 33 73C31 61 38 53 50 52Z" fill="currentColor" />
          <path d="M87 18C89 30 82 37 71 39C68 28 75 20 87 18Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
