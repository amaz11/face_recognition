import { useState } from "react";
import Modal from "../../Modal";
import {
  useGetDataQuery,
  usePostDataMutation,
} from "../../../service/endpoint";
import useModalHooks from "../../../utils/hooks/modalHooks";
import { toast } from "react-toastify";
import InputField from "../../textfield/InputField";
import { MdDriveFileRenameOutline } from "react-icons/md";

const CreateExamsLogs = () => {
  const {
    data,
    isLoading: dataIsLoading,
    isError,
    error,
  } = useGetDataQuery({ endpoint: "exams" });
  const [postData, { isLoading }] = usePostDataMutation();
  const [formData, setFormData] = useState({
    exam_year: "",
    registration_deadline: "",
    examId: undefined,
    exam_date: "",
    exam_start: "",
    exam_end: "",
  });

  const { modalToggle, setModalToggle } = useModalHooks();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postData({
        endpoint: "exam/log",
        data: formData,
        tags: ["examlog"],
      }).unwrap();
      if (res.success) toast.success(res?.message);
      setFormData({
        exam_year: "",
        registration_deadline: "",
        examId: undefined,
        exam_date: "",
        exam_start: "",
        exam_end: "",
      });
      setModalToggle(false);
    } catch (error: any) {
      toast.error(error?.data?.errors?.name[0]);
    }
  };
  return (
    <div>
      <Modal
        title="Create Exam Type"
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        buttonName="Create Exam log"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="pb-2 font-semibold text-sm starAfter"
            >
              Exams
            </label>
            <select
              name="examId"
              value={formData.examId}
              onChange={handleSelectChange}
              className="border-slate-500 px-3 py-2 border rounded focus:outline-[#1d69fa]"
            >
              <option value="none">Select Exam</option>
              {dataIsLoading ? (
                <option value="none">Loading...</option>
              ) : (
                // : isDesignationError ? (
                //     <option value="none">{designationError}</option>
                // )
                data?.data?.map(
                  ({ id, name }: { id: number; name: string }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  )
                )
              )}
            </select>
            {formData.examId === undefined ||
            formData.examId === "none" ||
            isError ? (
              <span className="pt-2 text-red-400">{error}</span>
            ) : null}
          </div>
          <InputField
            label="Registration Deadline"
            type="date"
            Icon={MdDriveFileRenameOutline}
            name="registration_deadline"
            value={formData.registration_deadline}
            onChange={handleChange}
            star={true}
          />
          <InputField
            label="Exam Year"
            type="text"
            Icon={MdDriveFileRenameOutline}
            name="exam_year"
            value={formData.exam_year}
            onChange={handleChange}
            star={true}
          />
          <InputField
            label="Exam Start"
            type="time"
            name="exam_start"
            value={formData.exam_start}
            onChange={handleChange}
            star={true}
          />
          <InputField
            label="Exam End"
            type="time"
            name="exam_end"
            value={formData.exam_end}
            onChange={handleChange}
            star={true}
          />
          <InputField
            label="Exam date"
            type="date"
            name="exam_date"
            value={formData.exam_date}
            onChange={handleChange}
            star={true}
          />
          <div className="flex justify-center items-center mt-8 mb-4">
            <button
              disabled={isLoading}
              className="px-10 py-1.5 font-semibold btn-primary"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateExamsLogs;
