import PSCTable from "../Components/table/PSCTable";
import PageHeader from "../Components/PageHeader";

const PSCExam = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="PSC Resources"
        description="Centralize timetable and teacher packs for Public Service Commission exams."
        stats={[
          {
            label: "Resource Slots",
            value: "2",
            badge: "Routine & Teachers",
          },
          {
            label: "Status",
            value: "Draft",
            badge: "Awaiting uploads",
          },
        ]}
      />
      <section className="rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60">
        <PSCTable />
      </section>
    </div>
  );
};

export default PSCExam;
