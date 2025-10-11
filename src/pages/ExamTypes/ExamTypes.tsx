import CreateExamsType from '../../Components/modal/Exams/CreateExamsType';
import UpdateExamsType from '../../Components/modal/Exams/Update/UpdateExamType';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable'
import { useGetDataQuery } from '../../service/endpoint';

const ExamTypes = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "examsType", tags: ['examsType'] })

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
        <div>
            <div>
                <CreateExamsType />
            </div>
            <div>
                <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} UpdateList={UpdateExamsType} isLoading={isLoading} isFetching={isFetching} endpoint='examsType' tags={["examsType"]} refetch={refetch} seeDetails={false} />
            </div>
        </div>
    )
}

export default ExamTypes