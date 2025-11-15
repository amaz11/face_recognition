const PSCTable = () => {
  const resources = [
    {
      label: "Routine File",
      description: "Upload the master timetable PDF for PSC exams.",
      status: "Pending upload",
    },
    {
      label: "Teachers File",
      description: "Provide the invigilator/teacher deployment sheet.",
      status: "Pending upload",
    },
  ];

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <div
          key={resource.label}
          className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              {resource.label}
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {resource.description}
            </p>
            <p className="text-sm text-slate-500">{resource.status}</p>
          </div>
          <button className="btn-primary min-w-[160px] justify-center px-6 opacity-60">
            Coming soon
          </button>
        </div>
      ))}
    </div>
  );
};

export default PSCTable;
