import { useGetDataQuery } from "../../../service/endpoint";

export type IdentityFieldSelection = { fieldKey: string; required: boolean };

const PRESETS: { name: string; keys: string[] }[] = [
  {
    name: "Admission",
    keys: ["SSC_ROLL", "SSC_REGISTRATION", "HSC_ROLL", "HSC_REGISTRATION"],
  },
  { name: "Job", keys: ["NID", "DRIVING_LICENCE", "PASSPORT"] },
];

const IdentityFieldsPicker = ({
  value,
  onChange,
}: {
  value: IdentityFieldSelection[];
  onChange: (next: IdentityFieldSelection[]) => void;
}) => {
  const { data, isLoading } = useGetDataQuery({
    endpoint: "exams/identity-fields/catalogue",
  });
  const catalogue: { key: string; label: string }[] = data?.data ?? [];

  const find = (key: string) => value.find((v) => v.fieldKey === key);

  const toggle = (key: string) => {
    onChange(
      find(key)
        ? value.filter((v) => v.fieldKey !== key)
        : [...value, { fieldKey: key, required: true }]
    );
  };

  const setRequired = (key: string, required: boolean) => {
    onChange(value.map((v) => (v.fieldKey === key ? { ...v, required } : v)));
  };

  const applyPreset = (keys: string[]) => {
    onChange(
      keys.map((k) => ({ fieldKey: k, required: find(k)?.required ?? true }))
    );
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-between items-center gap-2 pb-2">
        <span className="font-semibold text-sm">
          Applicant information required
        </span>
        <div className="flex gap-2 text-xs">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p.keys)}
              className="hover:bg-slate-100 px-2 py-1 border rounded"
            >
              {p.name} preset
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange([])}
            className="hover:bg-slate-100 px-2 py-1 border rounded"
          >
            Clear
          </button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-slate-500 text-sm">Loading...</p>
      ) : (
        <ul className="space-y-1">
          {catalogue.map(({ key, label }) => {
            const selected = find(key);
            return (
              <li key={key} className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={() => toggle(key)}
                  />
                  {label}
                </label>
                {selected && (
                  <label className="flex items-center gap-1 text-slate-600">
                    <input
                      type="checkbox"
                      checked={selected.required}
                      onChange={(e) => setRequired(key, e.target.checked)}
                    />
                    Required
                  </label>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p className="pt-2 text-slate-500 text-xs">
        Applicants only see the fields ticked here. Leave all unticked to ask
        for nothing.
      </p>
    </div>
  );
};

export default IdentityFieldsPicker;
