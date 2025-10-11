
import { useParams } from 'react-router-dom';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable'
import { useGetDataQuery } from '../../service/endpoint';

const Students = () => {
    const { examId } = useParams()
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: `admin/students/${examId}`, tags: ['students'] })
    const columns = [
        {
            accessorKey: "student.name", // accessorKey is used to access the field in the data
            header: 'Student Name',
        },
        {
            accessorKey: "student.email", // accessorKey is used to access the field in the data
            header: 'Email',
        },
        {
            accessorKey: "student.phone", // accessorKey is used to access the field in the data
            header: 'Phone',
        },

        {
            accessorKey: "exam_log.exam.name",
            header: 'Exam Name',
        },

        {
            accessorKey: "exam_log.exam_year",
            header: 'Exam Year',
        },

        {
            accessorKey: "registerNo",
            header: 'Register No.',
            Cell: ({ row }: { row: any }) => <span>{row.original.registerNo === null ? "N/A" : row.original.registerNo}</span>
        },

        {
            accessorKey: "rollNo",
            header: 'Roll No.',
            Cell: ({ row }: { row: any }) => <span>{row.original.rollNo === null ? "N/A" : row.original.rollNo}</span>
        },

    ];

    const tableObject = {
        renderTopToolbarCustomActions: () => {
            return <div className='mb-5 ml-4'>
                <h1 className='mt-5 font-semibold text-2xl'>
                    Students Table
                </h1>
            </div>
        },
    }
    return (
        <div>
            <div>

            </div>
            <div className='mt-10'>
                <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns}
                    // UpdateList={UpdateExamsType} 
                    isLoading={isLoading} isFetching={isFetching} endpoint={`admin/students/${examId}`} tags={["students"]} refetch={refetch} seeDetails={false} />
            </div>
        </div>
    )
}

export default Students