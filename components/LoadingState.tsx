export function LoadingState() {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2 lg:block lg:p-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="mb-0 h-32 animate-pulse rounded-md bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 lg:mb-3 lg:h-16"
          key={index}
        />
      ))}
    </div>
  );
}
