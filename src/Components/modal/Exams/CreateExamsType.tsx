import { useState } from "react"
import Modal from "../../Modal"
import { usePostDataMutation } from "../../../service/endpoint"
import useModalHooks from "../../../utils/hooks/modalHooks"
import { toast } from "react-toastify"
import InputField from "../../textfield/InputField"
import { MdDriveFileRenameOutline } from "react-icons/md";

const CreateExamsType = () => {
    const [postData, { isLoading }] = usePostDataMutation()
    const [formData, setFormData] = useState({
        name: ''
    })
    const { modalToggle, setModalToggle } = useModalHooks()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await postData({
                endpoint: "examsType",
                data: formData,
                tags: ["examsType"]
            }).unwrap();
            if (res.success) toast.success(res?.message)
            setFormData({ name: '' })
            setModalToggle(false)
        } catch (error: any) {
            toast.error(error?.data?.errors?.name[0])
        }
    }
    return (
        <div>
            <Modal title="Create Exam Type" modalToggle={modalToggle} setModalToggle={setModalToggle} buttonName="Create Exam-type" >
                <form onSubmit={handleSubmit}>
                    <InputField label="Exam Type" type="text" Icon={MdDriveFileRenameOutline} name="name" value={formData.name} onChange={handleChange} star={true} />
                    <div className="flex justify-center items-center mt-8 mb-4">
                        <button disabled={isLoading} className="px-10 py-1.5 font-semibold btn-primary">{isLoading ? "Loading..." : "Submit"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default CreateExamsType