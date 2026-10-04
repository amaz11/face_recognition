import { Link, useParams } from 'react-router-dom';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable'
import { useGetDataQuery } from '../../service/endpoint';
import PageHeader from '../../Components/PageHeader';

const orNA = (value: unknown) => (value === null || value === undefined || value === "" ? "N/A" : `${value}`)
const orTBA = (value: unknown) => (value === null || value === undefined || value === "" ? "TBA" : `${value}`)

const StudentExams = () => {
    const { studentId } = useParams()
    const endpoint = `admin/students/${studentId}/exams`
    const { data, isLoading, isFetching, isError, refetch } = useGetDataQuery({ endpoint, tags: ['student-exams'] })
    const student = data?.data?.student;
    const exams = data?.data?.exams ?? [];

    const columns = [
        {
            accessorKey: "examName",
            header: 'Exam Name',
        },
        {
            accessorKey: "examType",
            header: 'Type',
        },
        {
            accessorKey: "examYear",
            header: 'Year',
        },
        {
            accessorKey: "examDate",
            header: 'Date',
            Cell: ({ row }: { row: any }) => <span>{orTBA(row.original.examDate)}</span>
        },
        {
            id: "time",
            header: 'Time',
            accessorFn: (row: any) => row.examStart && row.examEnd ? `${row.examStart} - ${row.examEnd}` : "",
            Cell: ({ row }: { row: any }) => {
                const { examStart, examEnd } = row.original
                return <span>{examStart && examEnd ? `${examStart} - ${examEnd}` : orTBA(examStart ?? examEnd)}</span>
            }
        },
        {
            accessorKey: "rollNo",
            header: 'Roll No.',
            Cell: ({ row }: { row: any }) => <span>{orNA(row.original.rollNo)}</span>
        },
        {
            accessorKey: "registerNo",
            header: 'Register No.',
            Cell: ({ row }: { row: any }) => <span>{orNA(row.original.registerNo)}</span>
        },
        {
            id: "seatPlan",
            header: 'Seat Plan',
            accessorFn: (row: any) => row.seatPlan ? `${row.seatPlan.hallName} ${row.seatPlan.roomNo}` : "",
            Cell: ({ row }: { row: any }) => {
                const seatPlan = row.original.seatPlan
                return <span>{seatPlan ? `${seatPlan.hallName}, Room ${seatPlan.roomNo}` : "Not assigned"}</span>
            }
        },
    ];

    const tableObject = {
        renderTopToolbarCustomActions: () => {
            return <div className='mb-5 ml-4'>
                <h1 className='mt-5 font-semibold text-2xl'>
                    Applied Exams
                </h1>
            </div>
        },
    }

    return (
        <div className='space-y-6'>
            <PageHeader
                title={student?.name ?? "Student"}
                description={student ? `${student.email} | ${student.phone}` : "Exams this student has applied for."}
                actions={student ? (
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${student.registretionDone ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        Registered: {student.registretionDone ? "Yes" : "No"}
                    </span>
                ) : undefined}
                stats={[
                    {
                        label: "Exams Applied",
                        value: isLoading ? "--" : `${exams.length}`,
                        badge: `Student ID: ${studentId}`,
                    },
                ]}
            />
            <section className='rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60'>
                {isError ? (
                    <p className='text-sm text-red-600'>Could not load this student's exams.</p>
                ) : !isLoading && exams.length === 0 ? (
                    <p className='text-sm text-slate-500'>No exams applied.</p>
                ) : (
                    <MaterialsTable tableObject={tableObject} data={exams} columns={columns}
                        isLoading={isLoading} isFetching={isFetching} endpoint={endpoint} tags={["student-exams"]} refetch={refetch} seeDetails={false} />
                )}
                <div className='mt-4'>
                    <Link to="/all-students" className='text-sm text-indigo-600 hover:underline'>Back to all students</Link>
                </div>
            </section>
        </div>
    )
}

export default StudentExams
