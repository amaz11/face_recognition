
import AddTeacher from '../../Components/modal/teacher/AddTeacher/AddTeacher';
import UpdateTeacher from '../../Components/modal/teacher/UpdateTeacher';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable';
import { useGetDataQuery } from '../../service/endpoint';

const Teachers = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "teachers/teacher", tags: ['teacher'] })


    const columns = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "positions",
            header: "Position",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
    ];

    const tableObject = {
        renderTopToolbarCustomActions: () => {
            return <div className='mb-5 ml-4'>
                <h1 className='mt-5 font-semibold text-2xl'>
                    Teachers Table
                </h1>
            </div>
        },
    }
    return (
        <div>
            <div>
                <AddTeacher />
            </div>
            <div className="mt-10">
                <div>
                    <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} isLoading={isLoading} isFetching={isFetching} endpoint='teachers' tags={["teacher"]} refetch={refetch} seeDetails={false} UpdateList={UpdateTeacher} />
                </div>
            </div>
        </div>
    )
}

export default Teachers