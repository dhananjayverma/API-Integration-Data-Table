import { getInitials } from "@/lib/user-table";

type AvatarProps = {
  name: string;
};

export function Avatar({ name }: AvatarProps) {
  return (
    <div className="grid size-10 shrink-0 place-items-center rounded-md bg-gradient-to-br from-teal-500 to-blue-600 text-sm font-black text-white">
      {getInitials(name)}
    </div>
  );
}
