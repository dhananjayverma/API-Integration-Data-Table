import type { SortDirection, User } from "@/types/user";

export const ALL_CITIES = "All cities";

export function getCityOptions(users: User[]) {
  const uniqueCities = new Set(users.map((user) => user.address.city));
  return [ALL_CITIES, ...Array.from(uniqueCities).sort()];
}

export function getFilteredAndSortedUsers({
  users,
  searchTerm,
  selectedCity,
  sortDirection,
}: {
  users: User[];
  searchTerm: string;
  selectedCity: string;
  sortDirection: SortDirection;
}) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch);
      const matchesCity = selectedCity === ALL_CITIES || user.address.city === selectedCity;

      return matchesSearch && matchesCity;
    })
    .sort((firstUser, secondUser) => {
      const order = firstUser.name.localeCompare(secondUser.name);
      return sortDirection === "asc" ? order : -order;
    });
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
