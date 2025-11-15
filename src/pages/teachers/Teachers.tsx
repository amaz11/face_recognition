
import AddTeacher from '../../Components/modal/teacher/AddTeacher/AddTeacher';
import UpdateTeacher from '../../Components/modal/teacher/UpdateTeacher';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable';
import { useGetDataQuery } from '../../service/endpoint';
import PageHeader from '../../Components/PageHeader';

const Teachers = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "teachers/teacher", tags: ['teacher'] })
    const teachers = data?.data ?? [];
    const teachersCount = teachers.length;
    const reachable = teachers.filter((teacher: any) => Boolean(teacher?.phone)).length;


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
        <div className='space-y-6'>
            <PageHeader
                title="Invigilator Roster"
                description="Maintain a clean list of teachers and invigilators so duty rosters are always accurate."
                actions={<AddTeacher />}
                stats={[
                    {
                        label: "Registered Teachers",
                        value: teachersCount ? `${teachersCount}` : "--",
                        badge: "Available for duty",
                    },
                    {
                        label: "Contact Ready",
                        value: reachable ? `${reachable}` : "--",
                        badge: "Have phone numbers",
                    },
                ]}
            />
            <section className="rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60">
                <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} isLoading={isLoading} isFetching={isFetching} endpoint='teachers' tags={["teacher"]} refetch={refetch} seeDetails={false} UpdateList={UpdateTeacher} />
            </section>
        </div>
    )
}

export default Teachers
