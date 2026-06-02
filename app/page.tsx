"use client";

import { useEffect, useMemo, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
};

type SortDirection = "asc" | "desc";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All cities");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as User[];
  }

  async function loadUsers() {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load users right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    async function loadInitialUsers() {
      try {
        const data = await fetchUsers();

        if (isActive) {
          setUsers(data);
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load users right now.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadInitialUsers();

    return () => {
      isActive = false;
    };
  }, []);

  const cities = useMemo(() => {
    return ["All cities", ...Array.from(new Set(users.map((user) => user.address.city))).sort()];
  }, [users]);

  const visibleUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users
      .filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(normalizedSearch) ||
          user.email.toLowerCase().includes(normalizedSearch);
        const matchesCity =
          selectedCity === "All cities" || user.address.city === selectedCity;

        return matchesSearch && matchesCity;
      })
      .sort((firstUser, secondUser) => {
        const order = firstUser.name.localeCompare(secondUser.name);
        return sortDirection === "asc" ? order : -order;
      });
  }, [users, searchTerm, selectedCity, sortDirection]);

  function resetFilters() {
    setSearchTerm("");
    setSelectedCity("All cities");
    setSortDirection("asc");
  }

  const activeFilters =
    searchTerm.trim().length > 0 || selectedCity !== "All cities" || sortDirection !== "asc";

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-3 py-4 text-slate-950 sm:px-5 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <header className="animate-rise overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="bg-[linear-gradient(135deg,#0f766e,#2563eb_55%,#4f46e5)] px-4 py-5 text-white sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                  Public API Dashboard
                </p>
                <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  User directory
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base">
                  Search by name or email, filter users by city, and sort names
                  in both directions.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-sm font-bold ring-1 ring-white/20">
                <span
                  className={`size-2 rounded-full ${
                    error ? "bg-rose-300" : isLoading ? "bg-amber-300" : "bg-emerald-300"
                  }`}
                />
                {error ? "API error" : isLoading ? "Loading" : "API live"}
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
            <Stat label="Total users" value={users.length} />
            <Stat label="Visible" value={visibleUsers.length} />
            <Stat label="Cities" value={Math.max(cities.length - 1, 0)} />
          </div>
        </header>

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
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                City
              </span>
              <select
                className="h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
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
                  onClick={() => setSortDirection("asc")}
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
                  onClick={() => setSortDirection("desc")}
                >
                  Z-A
                </button>
              </div>
            </div>

            <button
              className="h-12 rounded-md border border-slate-200 px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
              disabled={!activeFilters}
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </section>

        <section className="animate-rise animation-delay-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-xl font-black text-slate-950">Users</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Showing {visibleUsers.length} of {users.length} records
              </p>
            </div>

            <button
              className="h-11 w-full rounded-md bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              type="button"
              disabled={isLoading}
              onClick={loadUsers}
            >
              Refresh data
            </button>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <StatePanel
              title="Could not load users"
              message={error}
              actionLabel="Try again"
              onAction={loadUsers}
            />
          ) : visibleUsers.length === 0 ? (
            <StatePanel
              title="No users found"
              message="Change the search text or city filter to view more results."
              actionLabel="Clear filters"
              onAction={resetFilters}
            />
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[860px] border-collapse text-left">
                  <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.1em] text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Name</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Company Name</th>
                      <th className="px-5 py-4">City</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleUsers.map((user, index) => (
                      <UserRow key={user.id} index={index} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 p-3 sm:grid-cols-2 lg:hidden">
                {visibleUsers.map((user, index) => (
                  <UserCard key={user.id} index={index} user={user} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-2xl font-black leading-none text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function UserRow({ user, index }: { user: User; index: number }) {
  return (
    <tr
      className="table-row-rise transition hover:bg-cyan-50/70"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={user.name} />
          <span className="font-black text-slate-950">{user.name}</span>
        </div>
      </td>
      <td className="px-5 py-4">
        <a
          className="font-bold text-blue-700 hover:text-teal-700"
          href={`mailto:${user.email}`}
        >
          {user.email}
        </a>
      </td>
      <td className="px-5 py-4 font-semibold text-slate-700">{user.company.name}</td>
      <td className="px-5 py-4">
        <CityBadge city={user.address.city} />
      </td>
    </tr>
  );
}

function UserCard({ user, index }: { user: User; index: number }) {
  return (
    <article
      className="table-row-rise rounded-md border border-slate-200 bg-white p-4 shadow-sm"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <div className="flex min-w-0 items-start gap-3">
        <Avatar name={user.name} />
        <div className="min-w-0 flex-1">
          <h3 className="break-words font-black leading-6 text-slate-950">{user.name}</h3>
          <a
            className="mt-1 block break-all text-sm font-bold text-blue-700"
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-md bg-slate-50 p-3 text-sm">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-400">
            Company
          </p>
          <p className="mt-1 break-words font-bold text-slate-800">{user.company.name}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-400">
            City
          </p>
          <CityBadge city={user.address.city} />
        </div>
      </div>
    </article>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="grid size-10 shrink-0 place-items-center rounded-md bg-gradient-to-br from-teal-500 to-blue-600 text-sm font-black text-white">
      {getInitials(name)}
    </div>
  );
}

function CityBadge({ city }: { city: string }) {
  return (
    <span className="inline-flex max-w-full rounded bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700 ring-1 ring-emerald-100">
      {city}
    </span>
  );
}

function StatePanel({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="grid min-h-[320px] place-items-center px-4 py-10 text-center">
      <div className="max-w-md">
        <p className="text-xl font-black text-slate-950">{title}</p>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{message}</p>
        <button
          className="mt-5 h-11 rounded-md bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function LoadingState() {
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

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
