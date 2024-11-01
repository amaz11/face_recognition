import { useState } from "react"
import useModalHooks from "../../../../utils/hooks/modalHooks"
import Modal from "../../../Modal"
import { useGetDataQuery, usePostDataMutation, usePostFileMutation } from "../../../../service/endpoint"
import { toast } from "react-toastify"



const AddTeacher = ({ id }: { id: any }) => {
    const { data, isLoading, isError: _isError, error: _error, } = useGetDataQuery({ endpoint: `exams/${id}`, tags: ['exams'] })

    const { modalToggle, setModalToggle } = useModalHooks()
    const [formData, setFormData] = useState({
        exclePath: "", examLogId: ""
    });
    const [postData, { isLoading: _postLoading }] = usePostDataMutation();
    const [postFile, { isLoading: fileLoading }] = usePostFileMutation();
    const [file, setFile] = useState<string | undefined>(undefined);


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Use optional chaining to safely access files
        if (file) {
            const objectURL = URL.createObjectURL(file);
            const fileData = new FormData();
            fileData.append("excle", file);

            try {
                const response = await postFile({
                    endpoint: "/excle/upload",
                    data: fileData,
                }).unwrap();
                console.log(response);
                if (response.success) {
                    setFile(objectURL);
                    setFormData((prevState) => ({
                        ...prevState,
                        exclePath: response?.exclePath,
                    }));
                }
            } catch (error: any) {
                toast.error(error?.data?.message);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (file?.length === 0 || formData.examLogId.length === 0) {
                toast.error("Please enter a file or Select Exam Date")
            }
            const res = await postData({
                endpoint: "/teachers",
                data: formData,
                tags: ["employees"],
            }).unwrap();

            console.log(res);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div>
            <Modal title="Assign Teachers" modalToggle={modalToggle} setModalToggle={setModalToggle} buttonName="Assign Teachers"  >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 pb-3">
                        <div className="flex flex-col">
                            <label
                                htmlFor="firstname"
                                className="pb-2 font-semibold text-sm starAfter"
                            >
                                Exam Date
                            </label>
                            <select
                                value={formData.examLogId}
                                onChange={handleSelectChange}
                                name="examLogId"
                                className="border-slate-500 px-3 py-2 border rounded focus:outline-[#1d69fa] text-black"
                            >
                                <option value="none">Select Exam Date</option>
                                {isLoading ? (
                                    <option value="none">Loading...</option>
                                )
                                    //   : isError ? (
                                    //     <option value="none">{deptError}</option>
                                    //   ) 
                                    : (
                                        data?.exam_log?.map(
                                            ({ id, exam_date }: { id: number; exam_date: string }) => (
                                                <option className="text-black" key={id} value={id}>
                                                    {exam_date === null ? "-/-/-" : exam_date}
                                                </option>
                                            )
                                        )
                                    )}
                            </select>
                            {/* {formData.examLogId === undefined ||
            formData.examLogId === "none" ? (
              <span className="pt-2 text-red-400">
                {formErrorData.examLogId}
              </span>
            ) : null} */}
                        </div>

                    </div>
                    <div>
                        <div className="flex gap-4">
                            <input
                                className="file:bg-blue-500 file:drop-shadow-none file:mr-5 mb-3 file:py-1.5 file:p-2 border border-blue-500 file:border-blue-500 rounded file:rounded w-full file:font-semibold file:text-white"
                                type="file"
                                onChange={handleFileChange}
                                accept=".xlsx, .xls"
                                name=""
                                id=""
                            />
                            {fileLoading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : null}
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddTeacher