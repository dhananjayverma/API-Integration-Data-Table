import { Avatar } from "@/components/Avatar";
import { CityBadge } from "@/components/CityBadge";
import type { User } from "@/types/user";

type UserTableProps = {
  users: User[];
};

export function UserTable({ users }: UserTableProps) {
  return (
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
          {users.map((user, index) => (
            <tr
              className="table-row-rise transition hover:bg-cyan-50/70"
              key={user.id}
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
              <td className="px-5 py-4 font-semibold text-slate-700">
                {user.company.name}
              </td>
              <td className="px-5 py-4">
                <CityBadge city={user.address.city} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
