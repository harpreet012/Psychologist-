interface AdminHeaderProps {
  title: string;
  description?: string;
}

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-2xl text-charcoal sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-1.5 text-sm text-charcoal-muted">{description}</p>
      )}
    </div>
  );
}
