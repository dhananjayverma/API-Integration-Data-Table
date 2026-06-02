import { ALL_CITIES } from "@/lib/user-table";
import type { SortDirection } from "@/types/user";

type DirectoryControlsProps = {
  activeFilters: boolean;
  cities: string[];
  searchTerm: string;
  selectedCity: string;
  sortDirection: SortDirection;
  onReset: () => void;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSortChange: (value: SortDirection) => void;
};

export function DirectoryControls({
  activeFilters,
  cities,
  searchTerm,
  selectedCity,
  sortDirection,
  onReset,
  onSearchChange,
  onCityChange,
  onSortChange,
}: DirectoryControlsProps) {
  return (
    <section className="animate-rise animation-delay-100 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_220px_190px_auto] xl:items-end">
        <label className="block md:col-span-2 xl:col-span-1">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            Search name or email
          </span>
          <input
            className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Example: Leanne or biz"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            City
          </span>
          <select
            className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            value={selectedCity}
            onChange={(event) => onCityChange(event.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === ALL_CITIES ? "All cities" : city}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            Sort by name
          </span>
          <div className="grid h-12 grid-cols-2 rounded-md border border-slate-200 bg-slate-100 p-1">
            <button
              className={`rounded text-sm font-black transition ${
                sortDirection === "asc"
                  ? "bg-slate-950 text-white shadow"
                  : "text-slate-600 hover:bg-white"
              }`}
              type="button"
              onClick={() => onSortChange("asc")}
            >
              A-Z
            </button>
            <button
              className={`rounded text-sm font-black transition ${
                sortDirection === "desc"
                  ? "bg-slate-950 text-white shadow"
                  : "text-slate-600 hover:bg-white"
              }`}
              type="button"
              onClick={() => onSortChange("desc")}
            >
              Z-A
            </button>
          </div>
        </div>

        <button
          className="h-12 rounded-md border border-slate-200 px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          disabled={!activeFilters}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
