import CreateExams from "../../Components/modal/Exams/CreateExams";
import UpdateExam from "../../Components/modal/Exams/Update/UpdateExam";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import { useGetDataQuery } from "../../service/endpoint";
import PageHeader from "../../Components/PageHeader";

const Exams = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError: _isError,
    error: _error,
    refetch,
  } = useGetDataQuery({ endpoint: "exams", tags: ["exams"] });
  const exams = data?.data ?? [];
  const totalExams = exams.length;
  const uniqueExamTypes = new Set(
    exams
      .map((exam: any) => exam?.exam_type?.name)
      .filter((name: string) => Boolean(name))
  ).size;
  const columns = [
    {
      accessorKey: "name", // accessorKey is used to access the field in the data
      header: "Exam",
    },
    {
      accessorKey: "exam_type.name", // accessorKey is used to access the field in the data
      header: "Exam Type",
    },
  ];

  const tableObject = {
    renderTopToolbarCustomActions: () => {
      return (
        <div className="mb-5 ml-4">
          <h1 className="mt-5 font-semibold text-2xl">Exam Table</h1>
        </div>
      );
    },
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Line-up"
        description="Review every scheduled exam and keep exam types aligned before publishing seat plans."
        actions={<CreateExams />}
        stats={[
          {
            label: "Active Exams",
            value: totalExams ? `${totalExams}` : "--",
            badge: "In registry",
          },
          {
            label: "Exam Types",
            value: uniqueExamTypes ? `${uniqueExamTypes}` : "--",
            badge: "Mapped categories",
          },
        ]}
      />
      <section className="rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60">
        <MaterialsTable
          tableObject={tableObject}
          data={data?.data}
          columns={columns}
          UpdateList={UpdateExam}
          isLoading={isLoading}
          isFetching={isFetching}
          endpoint="exams"
          tags={["exams"]}
          refetch={refetch}
          seeDetails={false}
        />
      </section>
    </div>
  );
};

export default Exams;
