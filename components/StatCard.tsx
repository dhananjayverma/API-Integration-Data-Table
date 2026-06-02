type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-2xl font-black leading-none text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </p>
    </div>
  );
}
