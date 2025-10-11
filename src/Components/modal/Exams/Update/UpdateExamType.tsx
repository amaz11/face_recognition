import { useState } from "react"
import { toast } from "react-toastify"
import InputField from "../../../textfield/InputField"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useUpdateDataMutation } from "../../../../service/endpoint"
import useModalHooks from "../../../../utils/hooks/modalHooks";
import UpdateModal from "../../UpdateModal";

const UpdateExamsType = ({ id, row }: { id: any, row: any }) => {
    const [updateData, { isLoading }] = useUpdateDataMutation()
    const [formData, setFormData] = useState({
        name: row.name || ''
    })
    const { modalToggle, setModalToggle } = useModalHooks()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await updateData({
                endpoint: `examsType/${id}`,
                data: formData,
                tags: ["examsType"]
            }).unwrap();
            if (res.success) toast.success(res?.message)
            setModalToggle(false)
        } catch (error: any) {
            toast.error(error?.data?.errors?.name[0])
        }
    }
    return (
        <div>
            <UpdateModal title="Create Exam Type" modalToggle={modalToggle} setModalToggle={setModalToggle}  >
                <form onSubmit={handleSubmit}>
                    <InputField label="Exam Type" type="text" Icon={MdDriveFileRenameOutline} name="name" value={formData.name} onChange={handleChange} star={true} />
                    <div className="flex justify-center items-center mt-8 mb-4">
                        <button disabled={isLoading} className="px-10 py-1.5 font-semibold btn-primary">{isLoading ? "Loading..." : "Submit"}</button>
                    </div>
                </form>
            </UpdateModal>
        </div>
    )
}

export default UpdateExamsType