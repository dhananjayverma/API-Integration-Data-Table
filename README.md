# User Directory Table

A responsive Next.js application that fetches users from a public API and displays them with search, sorting, filtering, loading, and error states.

## Project Setup Steps

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Features Implemented

- Fetches user data from `https://jsonplaceholder.typicode.com/users` using the Fetch API.
- Displays the required table columns: Name, Email, Company Name, and City.
- Search by name or email.
- Sort by name in A-Z and Z-A order.
- Filter users by city.
- Loading state with skeleton placeholders.
- Error state with retry action.
- Empty state when no users match the filters.
- Responsive UI:
  - Mobile and tablet use user cards for better readability.
  - Desktop uses a full table layout.
- Clean folder structure with reusable components, shared types, and helper functions.

## Folder Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Avatar.tsx
  CityBadge.tsx
  DirectoryControls.tsx
  LoadingState.tsx
  StatePanel.tsx
  StatCard.tsx
  UserCards.tsx
  UserDirectory.tsx
  UserTable.tsx
lib/
  user-table.ts
  users.ts
types/
  user.ts
```

## Folder Structure Explanation

### `app/`

This folder is required by the Next.js App Router. It contains the main route files and global app setup.

- `page.tsx`: The home page route. It only renders the `UserDirectory` component, keeping the route file clean.
- `layout.tsx`: The root layout for the app. It sets metadata and wraps all pages.
- `globals.css`: Global styles, Tailwind import, base font styling, and animation keyframes.
- `favicon.ico`: Browser tab icon.

### `components/`

This folder contains reusable UI components. Splitting UI into components keeps the main page smaller and easier to maintain.

- `UserDirectory.tsx`: Main client component. It manages API data, loading, error, search, sorting, and city filter state.
- `DirectoryControls.tsx`: Search input, city filter dropdown, sort buttons, and reset button.
- `UserTable.tsx`: Desktop table view for users.
- `UserCards.tsx`: Mobile and tablet card view for better responsive design.
- `Avatar.tsx`: Shows user initials in a small gradient avatar.
- `CityBadge.tsx`: Reusable city label design.
- `StatCard.tsx`: Shows summary counts like total users, visible users, and cities.
- `LoadingState.tsx`: Skeleton loading UI while API data is being fetched.
- `StatePanel.tsx`: Reusable empty/error state panel with an action button.

### `lib/`

This folder contains reusable logic that is not directly UI. Keeping this separate makes the code cleaner and easier to test or update.

- `users.ts`: Contains the API URL and `fetchUsers` function.
- `user-table.ts`: Contains table helper logic like city options, search/filter/sort logic, and initials generation.

### `types/`

This folder contains shared TypeScript types used across the project.

- `user.ts`: Defines the `User` type based on the API response and the `SortDirection` type.

### Why this structure is used

- Keeps route files simple and readable.
- Separates UI, API logic, helper functions, and TypeScript types.
- Makes components reusable instead of writing everything in one large file.
- Improves maintainability if more API fields, filters, or table features are added later.
- Makes the project easier for a reviewer to understand.

## Assumptions and Decisions Made

- The app uses Next.js App Router with a client component for interactive state.
- The Fetch API was used instead of Axios to avoid adding unnecessary dependencies.
- City filter options are generated dynamically from the API response.
- Sorting defaults to A-Z because it is the most common table behavior.
- Mobile screens show cards instead of forcing a wide table, improving responsiveness.
- No extra UI component library was added, keeping the project lightweight.
