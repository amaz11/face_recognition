import { useEffect, useState } from "react";
import UpdateModal from "../UpdateModal";
import { useGetDataQuery, useUpdateDataMutation } from "../../../service/endpoint";
import { toast } from "react-toastify";
import InputField from "../../textfield/InputField";
import { MdDriveFileRenameOutline } from "react-icons/md";


const UpdateRoom = ({ row, modalToggle, setModalToggle }: { row: any, modalToggle: boolean, setModalToggle: any }) => {
    const {
        data,
        isLoading: dataIsLoading,
        isError,
        error,
    } = useGetDataQuery({ endpoint: "exam_hall", tags: ['exam_hall'] });
    const [updateData, { isLoading }] = useUpdateDataMutation()

    const [formData, setFormData] = useState({
        roomNo: '',
        hallId: undefined,
        capacity: 1
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const res = await updateData({
                endpoint: `exam_hall/${row.id}`,
                data: formData,
                tags: ["exam_hall"],
            }).unwrap();
            if (res?.ok) {
                toast.success(res?.message);
            }
            setModalToggle(false);
        } catch (error: any) {
            toast.error(error.error.message)
        }
    };

    useEffect(() => {
        setFormData({
            roomNo: row.roomNo || '',
            hallId: row.hallId || undefined,
            capacity: row.capacity || 1,
        })
    }, [modalToggle])

    return (
        <UpdateModal title="Update Teacher" modalToggle={modalToggle} setModalToggle={setModalToggle} >
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label
                        htmlFor="lastname"
                        className="pb-2 font-semibold text-sm starAfter"
                    >
                        Exam Type
                    </label>
                    <select
                        name="employee_designation_id"
                        value={formData.hallId}
                        onChange={handleSelectChange}
                        className="px-3 py-2 border border-slate-500 rounded focus:outline-[#1d69fa]"
                    >
                        <option value="none">Select Type</option>
                        {dataIsLoading ? (
                            <option value="none">Loading...</option>
                        )
                            // : isDesignationError ? (
                            //     <option value="none">{designationError}</option>
                            // ) 
                            : (
                                data?.data?.map(
                                    ({ id, name }: { id: number; name: string }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    )
                                )
                            )}
                    </select>
                    {formData.hallId === undefined ||
                        formData.hallId === "none" || isError ? (
                        <span className="pt-2 text-red-400">
                            {error}
                        </span>
                    ) : null}
                </div>
                <InputField label="Room No" type="text" Icon={MdDriveFileRenameOutline} name="name" value={formData.roomNo} onChange={handleChange} star={true} />
                <InputField label="Room Capacity" type="number" min={1} Icon={MdDriveFileRenameOutline} name="name" value={formData.capacity} onChange={handleChange} star={true} />
                <div className="flex justify-center items-center mt-8 mb-4">
                    <button disabled={isLoading} className="px-10 py-1.5 font-semibold btn-primary">{isLoading ? "Loading..." : "Submit"}</button>
                </div>
            </form>
        </UpdateModal>
    )
}

export default UpdateRoom