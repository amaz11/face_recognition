
import CreateExams from "../../Components/modal/Exams/CreateExams";
import UpdateExam from "../../Components/modal/Exams/Update/UpdateExam";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import { useGetDataQuery } from "../../service/endpoint";


const Exams = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "exams", tags: ['exams'] })
    const columns = [
        {
            accessorKey: "name", // accessorKey is used to access the field in the data
            header: 'Exam',
        },
        {
            accessorKey: "exam_type.name", // accessorKey is used to access the field in the data
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
        <div>
            <div>
                <CreateExams />
            </div>
            <div className="mt-10">
                <div>
                    <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} UpdateList={UpdateExam} isLoading={isLoading} isFetching={isFetching} endpoint='exams' tags={["exams"]} refetch={refetch} seeDetails={false} />
                </div>
            </div>
        </div>
    )
}

export default Exams