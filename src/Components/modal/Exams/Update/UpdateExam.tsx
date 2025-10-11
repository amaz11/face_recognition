import { useState } from "react";
import {
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../../../service/endpoint";
import useModalHooks from "../../../../utils/hooks/modalHooks";
import { toast } from "react-toastify";
import InputField from "../../../textfield/InputField";
import { MdDriveFileRenameOutline } from "react-icons/md";
import UpdateModal from "../../UpdateModal";

const UpdateExam = ({ id, row }: { id: any; row: any }) => {
  const {
    data,
    isLoading: dataIsLoading,
    isError,
    error,
  } = useGetDataQuery({ endpoint: "examsType" });
  const [updateData, { isLoading }] = useUpdateDataMutation();

  const [formData, setFormData] = useState({
    name: row.name || "",
    examTypeId: row.exam_type.id || undefined,
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
      const res = await updateData({
        endpoint: `exams/${id}`,
        data: formData,
        tags: ["exams"],
      }).unwrap();
      if (res.success) toast.success(res?.message);
      setModalToggle(false);
    } catch (error: any) {
      toast.error(error?.data?.errors?.name[0]);
    }
  };
  return (
    <div>
      <UpdateModal
        title="Update Exam"
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        buttonName="Edit"
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Exam"
            type="text"
            Icon={MdDriveFileRenameOutline}
            name="name"
            value={formData.name}
            onChange={handleChange}
            star={true}
          />
          <div className="flex flex-col">
            <label
              htmlFor="lastname"
              className="pb-2 font-semibold text-sm starAfter"
            >
              Exam Type
            </label>
            <select
              name="examTypeId"
              value={formData.examTypeId}
              onChange={handleSelectChange}
              className="border-slate-500 px-3 py-2 border rounded focus:outline-[#1d69fa]"
            >
              <option value="none">Select Type</option>
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
            {formData.examTypeId === undefined ||
            formData.examTypeId === "none" ||
            isError ? (
              <span className="pt-2 text-red-400">{error}</span>
            ) : null}
          </div>
          <div className="flex justify-center items-center mt-8 mb-4">
            <button
              disabled={isLoading}
              className="px-10 py-1.5 font-semibold btn-primary"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </UpdateModal>
    </div>
  );
};

export default UpdateExam;
