import type { User } from "@/types/user";

export const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as User[];
}
