import CreateExamsType from '../../Components/modal/Exams/CreateExamsType';
import UpdateExamsType from '../../Components/modal/Exams/Update/UpdateExamType';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable'
import { useGetDataQuery } from '../../service/endpoint';
import PageHeader from '../../Components/PageHeader';

const ExamTypes = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "examsType", tags: ['examsType'] })
    const totalTypes = data?.data?.length ?? 0;
    const totalExams =
        data?.data?.reduce(
            (sum: number, examType: any) => sum + (examType?.exams?.length ?? 0),
            0
        ) ?? 0;

    const columns = [
        {
            accessorKey: "name", // accessorKey is used to access the field in the data
            header: 'Exam Type',
        },
    ];

    const tableObject = {
        renderTopToolbarCustomActions: () => {
            return <div className='mb-5 ml-4'>
                <h1 className='mt-5 font-semibold text-2xl'>
                    Exam Type Table
                </h1>
            </div>
        },
    }
    return (
        <div className='space-y-6'>
            <PageHeader
                title="Exam Type Catalogue"
                description="Keep the registry of exam categories tidy so invigilation teams always know what’s running."
                actions={<CreateExamsType />}
                stats={[
                    {
                        label: "Active Types",
                        value: totalTypes ? `${totalTypes}` : "--",
                        badge: "Synced with server",
                    },
                    {
                        label: "Mapped Exams",
                        value: totalExams ? `${totalExams}` : "--",
                        badge: "Across all divisions",
                    },
                ]}
            />
            <section className='rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60'>
                <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} UpdateList={UpdateExamsType} isLoading={isLoading} isFetching={isFetching} endpoint='examsType' tags={["examsType"]} refetch={refetch} seeDetails={false} />
            </section>
        </div>
    )
}

export default ExamTypes
