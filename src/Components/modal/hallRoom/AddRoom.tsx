import { useState } from 'react';
import useModalHooks from '../../../utils/hooks/modalHooks';
import Modal from '../../Modal';
import InputField from '../../textfield/InputField';
import { toast } from 'react-toastify';
import { useGetDataQuery, usePostDataMutation } from '../../../service/endpoint';
import { MdDriveFileRenameOutline } from 'react-icons/md';

const AddRoom = () => {
    const {
        data,
        isLoading: dataIsLoading,
        isError,
        error,
    } = useGetDataQuery({ endpoint: "exam_hall", tags: ['exam_hall'] });
    const [postData, { isLoading }] = usePostDataMutation()
    const [formData, setFormData] = useState({
        roomNo: '',
        hallId: undefined,
        capacity: 1
    })
    const { modalToggle, setModalToggle } = useModalHooks();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await postData({
                endpoint: "hall_rooms",
                data: formData,
                tags: ["exam_hall"]
            }).unwrap();
            if (res.success) toast.success(res?.message)
            setFormData({
                roomNo: '',
                hallId: undefined,
                capacity: 1
            })
            setModalToggle(false)
        } catch (error: any) {
            toast.error(error?.data?.errors?.name[0])
        }
    }
    return (
        <div>
            <Modal title="Hall Room" modalToggle={modalToggle} setModalToggle={setModalToggle} buttonName="Add Hall Room"  >
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
                    <InputField label="Exam" type="number" min={1} Icon={MdDriveFileRenameOutline} name="name" value={formData.capacity} onChange={handleChange} star={true} />
                    <div className="flex justify-center items-center mt-8 mb-4">
                        <button disabled={isLoading} className="px-10 py-1.5 font-semibold btn-primary">{isLoading ? "Loading..." : "Submit"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddRoom