import CreateExamsLogs from "../../Components/modal/Exams/CreateExamLog";
import UpdateExamsLogs from "../../Components/modal/Exams/Update/UdpateExamLog";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import { useGetDataQuery } from "../../service/endpoint";
import PageHeader from "../../Components/PageHeader";
import { toast } from "react-toastify";

const ExamLogs = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError: _isError,
    error: _error,
    refetch,
  } = useGetDataQuery({ endpoint: "/exam/log", tags: ["examlog"] });
  const logs = data?.data ?? [];
  const totalLogs = logs.length;
  const upcomingDeadlines = logs.filter((log: any) => {
    if (!log?.registration_deadline) return false;
    const timestamp = Date.parse(log.registration_deadline);
    if (Number.isNaN(timestamp)) return false;
    return timestamp >= Date.now();
  }).length;

  const columns = [
    {
      accessorKey: "exam.name", // accessorKey is used to access the field in the data
      header: "Exam",
    },
    {
      accessorKey: "registration_deadline", // accessorKey is used to access the field in the data
      header: "Registration Deadline",
    },
    {
      id: "applyLink",
      header: "Apply Link",
      accessorFn: (row: any) => row?.exam_log_token?.[0]?.token ?? "",
      Cell: ({ row }: any) => {
        const applyToken = row.original?.exam_log_token?.[0]?.token;
        if (!applyToken) return <span className="text-slate-400">--</span>;
        const link = `${window.location.origin}/apply/${applyToken}`;
        return (
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Apply link copied");
            }}
          >
            Copy Apply Link
          </button>
        );
      },
    },
  ];

  const tableObject = {
    renderTopToolbarCustomActions: () => {
      return (
        <div className="mb-5 ml-4">
          <h1 className="mt-5 font-semibold text-2xl">Exam History Table</h1>
        </div>
      );
    },
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Log Timeline"
        description="Registration and scheduling checkpoints for every exam cycle at a glance."
        actions={<CreateExamsLogs />}
        stats={[
          {
            label: "Tracked Logs",
            value: totalLogs ? `${totalLogs}` : "--",
            badge: "Historical entries",
          },
          {
            label: "Open Deadlines",
            value: `${upcomingDeadlines}`,
            badge: "Require follow-up",
          },
        ]}
      />
      <section className="rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60">
        <MaterialsTable
          tableObject={tableObject}
          data={data?.data}
          columns={columns}
          UpdateList={UpdateExamsLogs}
          isLoading={isLoading}
          isFetching={isFetching}
          endpoint="/exam/log"
          tags={["examlog"]}
          refetch={refetch}
          seeDetails={false}
        />
      </section>
    </div>
  );
};

export default ExamLogs;
