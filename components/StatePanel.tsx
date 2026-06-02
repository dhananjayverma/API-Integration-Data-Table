type StatePanelProps = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
};

export function StatePanel({ title, message, actionLabel, onAction }: StatePanelProps) {
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
