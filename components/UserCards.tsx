import { Avatar } from "@/components/Avatar";
import { CityBadge } from "@/components/CityBadge";
import type { User } from "@/types/user";

type UserCardsProps = {
  users: User[];
};

export function UserCards({ users }: UserCardsProps) {
  return (
    <div className="grid gap-3 p-3 sm:grid-cols-2 lg:hidden">
      {users.map((user, index) => (
        <article
          className="table-row-rise rounded-md border border-slate-200 bg-white p-4 shadow-sm"
          key={user.id}
          style={{ animationDelay: `${index * 35}ms` }}
        >
          <div className="flex min-w-0 items-start gap-3">
            <Avatar name={user.name} />
            <div className="min-w-0 flex-1">
              <h3 className="break-words font-black leading-6 text-slate-950">
                {user.name}
              </h3>
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
              <p className="mt-1 break-words font-bold text-slate-800">
                {user.company.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-400">
                City
              </p>
              <CityBadge city={user.address.city} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
