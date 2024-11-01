import CreateExamsLogs from "../../Components/modal/Exams/CreateExamLog"
import UpdateExamsLogs from "../../Components/modal/Exams/Update/UdpateExamLog";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import { useGetDataQuery } from "../../service/endpoint";


const ExamLogs = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "/exam/log", tags: ['examlog'] })

    const columns = [
        {
            accessorKey: "exam.name", // accessorKey is used to access the field in the data
            header: 'Exam',
        },
        {
            accessorKey: "registration_deadline", // accessorKey is used to access the field in the data
            header: 'Registration Deadline',
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
        <div>
            <div>
                <CreateExamsLogs />
            </div>

            <div className="mt-10">
                <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} UpdateList={UpdateExamsLogs} isLoading={isLoading} isFetching={isFetching} endpoint='/exam/log' tags={["examlog"]} refetch={refetch} seeDetails={false} />
            </div>

        </div>
    )
}

export default ExamLogs