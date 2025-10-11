import React, { useEffect, useState } from "react";
import { MdDriveFileRenameOutline, MdLocationOn, MdPin } from "react-icons/md";
import InputField from "../../textfield/InputField";
import { useUpdateDataMutation } from "../../../service/endpoint";
import useModalHooks from "../../../utils/hooks/modalHooks";
import { toast } from "react-toastify";
import UpdateModal from "../UpdateModal";
// Adjust this path as needed

interface InstitutionFormData {
  name: string;
  address: string;
  eiin: string;
}

const UpdateInstitutionForm = ({ id, row }: { id: any; row: any }) => {
  const [updateData, { isLoading }] = useUpdateDataMutation();
  const { modalToggle, setModalToggle } = useModalHooks();
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: "",
    address: "",
    eiin: "",
  });

  const [formErrorData, setFormErrorData] = useState<InstitutionFormData>({
    name: "",
    address: "",
    eiin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "name":
        setFormErrorData((prev: any) => ({
          ...prev,
          name: "",
        }));
        break;
      case "address":
        setFormErrorData((prev: any) => ({
          ...prev,
          address: "",
        }));
        break;
      case "eiin":
        setFormErrorData((prev: any) => ({
          ...prev,
          eiin: "",
        }));
        break;
      default:
        break;
    }
  };

  const errorFromHandler = () => {
    let hasError = false;

    for (const key in formData) {
      const value = formData[key as keyof InstitutionFormData];
      if (["name", "address", "eiin"].includes(key)) {
        if (
          value === "" ||
          value === "none" ||
          value === null ||
          value === undefined
        ) {
          hasError = true;

          setFormErrorData((prev: any) => ({
            ...prev,
            [key]: "Please fill in the required fields.",
          }));
        } else {
          // Clear error for the specific field if valid
          setFormErrorData((prev: any) => ({
            ...prev,
            [key]: "",
          }));
        }
      }
    }
    return !hasError;
  };

  const closeAndresetForm = () => {
    setFormData({
      name: "",
      address: "",
      eiin: "",
    });
    setFormErrorData({
      name: "",
      address: "",
      eiin: "",
    });
    setModalToggle(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkFormError = errorFromHandler();

    if (checkFormError)
      try {
        const res = await updateData({
          endpoint: `exam_hall/${id}`,
          data: formData,
          tags: ["exam_hall"],
        }).unwrap();
        if (res?.ok) {
          toast.success(res?.message);
        }
        closeAndresetForm();
      } catch (error: any) {
        toast.error(error.error.message);
      }
  };

  useEffect(() => {
    setFormData({
      name: row.name || "",
      address: row.address || "",
      eiin: row.eiin || "",
    });
  }, [modalToggle]);
  return (
    <UpdateModal
      title="Update Hall"
      modalToggle={modalToggle}
      setModalToggle={setModalToggle}
    >
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <InputField
          label="Name"
          type="text"
          Icon={MdDriveFileRenameOutline}
          name="name"
          value={formData.name}
          onChange={handleChange}
          star={true}
          error={formErrorData.name}
        />

        <InputField
          label="Address"
          type="text"
          Icon={MdLocationOn}
          name="address"
          value={formData.address}
          onChange={handleChange}
          star={true}
          error={formErrorData.address}
        />

        <InputField
          label="EIIN"
          type="text"
          Icon={MdPin}
          name="eiin"
          value={formData.eiin}
          onChange={handleChange}
          star={true}
          error={formErrorData.eiin}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          disabled={isLoading}
        >
          Update Hall
        </button>
      </form>
    </UpdateModal>
  );
};

export default UpdateInstitutionForm;
