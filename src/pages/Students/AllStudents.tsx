import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MaterialsTable from '../../Components/table/materialTable/MaterialTable'
import { useGetDataQuery } from '../../service/endpoint';
import PageHeader from '../../Components/PageHeader';

const AllStudents = () => {
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 })

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput.trim())
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
        }, 300)
        return () => clearTimeout(timer)
    }, [searchInput])

    const query = new URLSearchParams({
        page: `${pagination.pageIndex + 1}`,
        limit: `${pagination.pageSize}`,
        ...(search && { search }),
    }).toString()
    const endpoint = `admin/students?${query}`
    const { data, isLoading, isFetching, refetch } = useGetDataQuery({ endpoint, tags: ['all-students'] })
    const students = data?.data ?? [];
    const total = data?.count ?? 0;

    const columns = [
        {
            accessorKey: "name",
            header: 'Student Name',
        },
        {
            accessorKey: "email",
            header: 'Email',
        },
        {
            accessorKey: "phone",
            header: 'Phone',
        },
        {
            accessorKey: "registretionDone",
            header: 'Registered',
            Cell: ({ row }: { row: any }) => <span>{row.original.registretionDone ? "Yes" : "No"}</span>
        },
        {
            accessorKey: "examCount",
            header: 'Exams Applied',
        },
        {
            id: "viewExams",
            header: 'Action',
            enableSorting: false,
            Cell: ({ row }: { row: any }) => (
                <Link to={`/all-students/${row.original.id}`} className='text-indigo-600 hover:underline'>
                    View exams
                </Link>
            )
        },
    ];

    const tableObject = {
        renderTopToolbarCustomActions: () => {
            return <div className='mb-5 ml-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-6'>
                <h1 className='mt-5 font-semibold text-2xl'>
                    Students Table
                </h1>
                <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search name, email or phone"
                    className='mt-2 w-full md:w-72 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400'
                />
            </div>
        },
    }

    return (
        <div className='space-y-6'>
            <PageHeader
                title="All Students"
                description="Search any student and check how many exams they applied for."
                stats={[
                    {
                        label: search ? "Matching Students" : "Total Students",
                        value: isLoading ? "--" : `${total}`,
                        badge: search ? `Search: ${search}` : undefined,
                    },
                ]}
            />
            <section className='rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60'>
                <MaterialsTable tableObject={tableObject} data={students} columns={columns}
                    isLoading={isLoading} isFetching={isFetching} endpoint="admin/students" tags={["all-students"]} refetch={refetch}
                    enableRowActions={false} seeDetails={false}
                    serverPagination={{ pagination, onPaginationChange: setPagination, rowCount: total }} />
            </section>
        </div>
    )
}

export default AllStudents
