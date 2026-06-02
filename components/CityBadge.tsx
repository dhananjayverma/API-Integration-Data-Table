type CityBadgeProps = {
  city: string;
};

export function CityBadge({ city }: CityBadgeProps) {
  return (
    <span className="inline-flex max-w-full rounded bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700 ring-1 ring-emerald-100">
      {city}
    </span>
  );
}
