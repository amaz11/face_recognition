import { useParams } from 'react-router-dom';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable'
import { useGetDataQuery } from '../../service/endpoint';
import PageHeader from '../../Components/PageHeader';

const Students = () => {
    const { examId, exam } = useParams()
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: `admin/students/${examId}`, tags: ['students'] })
    const students = data?.data ?? [];
    const totalStudents = students.length;
    const missingRoll = students.filter((student: any) => !student?.rollNo).length;
    const examName = students[0]?.exam_log?.exam?.name ?? exam ?? "Exam";
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
        <div className='space-y-6'>
            <PageHeader
                title={`${examName} Candidates`}
                description="Cross-check the registrants synced from the admin portal before issuing admit cards."
                stats={[
                    {
                        label: "Students Synced",
                        value: totalStudents ? `${totalStudents}` : "--",
                        badge: `Exam ID: ${examId}`,
                    },
                    {
                        label: "Roll Pending",
                        value: `${missingRoll}`,
                        badge: "Require update",
                    },
                ]}
            />
            <section className='rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60'>
                <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns}
                    // UpdateList={UpdateExamsType} 
                    isLoading={isLoading} isFetching={isFetching} endpoint={`admin/students/${examId}`} tags={["students"]} refetch={refetch} seeDetails={false} />
            </section>
        </div>
    )
}

export default Students
