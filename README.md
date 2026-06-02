# User Insights Table

A responsive Next.js app that fetches users from the JSONPlaceholder public API and displays them in an interactive table.

## Project Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

For a production build:

```bash
npm run build
npm run start
```

## Features Implemented

- Fetches data from `https://jsonplaceholder.typicode.com/users` using the Fetch API.
- Displays user data in a table with the required columns: Name, Email, Company Name, and City.
- Search by user name or email.
- Sort by name in A-Z and Z-A order.
- Filter users by city.
- Loading skeletons while data is being fetched.
- Error state with retry support.
- Empty state when no users match the active filters.
- Responsive layout with horizontal table scrolling on smaller screens.
- Polished gradient UI, animated sections, animated rows, and hover states.

## Assumptions and Decisions

- The app uses Next.js with the App Router and a client component for interactive table state.
- City options are generated from the API response, so the filter stays accurate if the API data changes.
- Sorting defaults to A-Z because it is the most common directory/table behavior.
- No extra UI libraries were added, keeping the project lightweight and easy to run.
