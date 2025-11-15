import { ReactNode } from "react";

type Stat = {
  label: string;
  value: string;
  badge?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  stats?: Stat[];
};

const PageHeader = ({
  title,
  description,
  eyebrow = "Operations overview",
  actions,
  stats = [],
}: PageHeaderProps) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-lg shadow-slate-200/60">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              {description}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-4 flex flex-wrap gap-3 text-sm">{actions}</div>
          ) : null}
        </div>
        {stats.length > 0 ? (
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-inner shadow-white/40 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                {stat.badge ? (
                  <p className="text-xs text-slate-500">{stat.badge}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PageHeader;
