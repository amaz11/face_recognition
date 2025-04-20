import CreateInstitutionForm from "../../Components/modal/hallRoom/AddHall"
import UpdateInstitutionForm from "../../Components/modal/hallRoom/UpdateHall";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import { useGetDataQuery } from "../../service/endpoint"


const HallRoom = () => {
    const { data, isLoading, isFetching, isError: _isError, error: _error, refetch } = useGetDataQuery({ endpoint: "exam_hall", tags: ['exam_hall'] })

    const columns = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "eiin",
            header: "EIIN",
        },
    ];
    const tableObject = {
        renderTopToolbarCustomActions: () => {
            return <div className='mb-5 ml-4'>
                <h1 className='mt-5 font-semibold text-2xl'>
                    Hall's Table
                </h1>
            </div>
        },
    }

    return (
        <div>
            <CreateInstitutionForm />
            <div className="mt-10">
                <div>
                    <MaterialsTable tableObject={tableObject} data={data?.data} columns={columns} isLoading={isLoading} isFetching={isFetching} endpoint='exam_hall' tags={["exam_hall"]} refetch={refetch} seeDetails={false} UpdateList={UpdateInstitutionForm} />
                </div>
            </div>
        </div>
    )
}

export default HallRoom