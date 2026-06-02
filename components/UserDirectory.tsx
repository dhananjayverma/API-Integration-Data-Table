"use client";

import { useEffect, useMemo, useState } from "react";
import { DirectoryControls } from "@/components/DirectoryControls";
import { LoadingState } from "@/components/LoadingState";
import { StatePanel } from "@/components/StatePanel";
import { StatCard } from "@/components/StatCard";
import { UserCards } from "@/components/UserCards";
import { UserTable } from "@/components/UserTable";
import { fetchUsers } from "@/lib/users";
import {
  ALL_CITIES,
  getCityOptions,
  getFilteredAndSortedUsers,
} from "@/lib/user-table";
import type { SortDirection, User } from "@/types/user";

export function UserDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(ALL_CITIES);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  const cities = useMemo(() => getCityOptions(users), [users]);
  const visibleUsers = useMemo(() => {
    return getFilteredAndSortedUsers({
      users,
      searchTerm,
      selectedCity,
      sortDirection,
    });
  }, [users, searchTerm, selectedCity, sortDirection]);

  function resetFilters() {
    setSearchTerm("");
    setSelectedCity(ALL_CITIES);
    setSortDirection("asc");
  }

  const activeFilters =
    searchTerm.trim().length > 0 || selectedCity !== ALL_CITIES || sortDirection !== "asc";

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
            <StatCard label="Total users" value={users.length} />
            <StatCard label="Visible" value={visibleUsers.length} />
            <StatCard label="Cities" value={Math.max(cities.length - 1, 0)} />
          </div>
        </header>

        <DirectoryControls
          activeFilters={activeFilters}
          cities={cities}
          searchTerm={searchTerm}
          selectedCity={selectedCity}
          sortDirection={sortDirection}
          onCityChange={setSelectedCity}
          onReset={resetFilters}
          onSearchChange={setSearchTerm}
          onSortChange={setSortDirection}
        />

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
              <UserTable users={visibleUsers} />
              <UserCards users={visibleUsers} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
