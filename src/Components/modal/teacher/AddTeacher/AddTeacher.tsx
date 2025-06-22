import { useState } from "react";
import useModalHooks from "../../../../utils/hooks/modalHooks";
import Modal from "../../../Modal";
import {
  MdDriveFileRenameOutline,
  MdWork,
  MdEmail,
  MdPhone,
  MdHome,
} from "react-icons/md";
import { usePostDataMutation } from "../../../../service/endpoint";
import { toast } from "react-toastify";
import InputField from "../../../textfield/InputField";

interface TeacherFormData {
  name: string;
  positions: string;
  email: string;
  phone: string;
  address?: string;
}

const AddTeacher = () => {
  const [postData, { isLoading }] = usePostDataMutation();
  const { modalToggle, setModalToggle } = useModalHooks();
  const [formData, setFormData] = useState<TeacherFormData>({
    name: "",
    positions: "",
    email: "",
    phone: "",
    address: "",
  });

  const [formErrorData, setFormErrorData] = useState<TeacherFormData>({
    name: "",
    positions: "",
    email: "",
    phone: "",
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
      case "positions":
        setFormErrorData((prev: any) => ({
          ...prev,
          positions: "",
        }));
        break;
      case "email":
        const emailMatch =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        // formData.email.toLowerCase().match(emailPattern);

        if (!emailMatch) {
          setFormErrorData((prev: any) => ({
            ...prev,
            email: "Please provide a valid email address.",
          }));
        } else {
          setFormErrorData((prev: any) => ({
            ...prev,
            email: "",
          }));
        }
        break;
      case "phone":
        const numberPatterMatch =
          /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value);
        if (numberPatterMatch && value.length === 11) {
          setFormErrorData((prev: any) => ({
            ...prev,
            phone: "",
          }));
        } else if (
          numberPatterMatch &&
          (value.length > 11 || value.length < 11)
        ) {
          setFormErrorData((prev: any) => ({
            ...prev,
            phone: "Please provide 11 digit phone number.",
          }));
        } else {
          setFormErrorData((prev: any) => ({
            ...prev,
            phone: "Please provide numeric number.",
          }));
        }
        break;

      default:
        break;
    }
  };

  const errorFromHandler = () => {
    let hasError = false;

    for (const key in formData) {
      const value = formData[key as keyof TeacherFormData];
      if (["name", "positions", "email", "phone"].includes(key)) {
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

      if (key === "email" && value) {
        // Additional validation for email

        const emailMatch =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            formData["email"].toLowerCase()
          );

        if (!emailMatch) {
          hasError = true;

          setFormErrorData((prev: any) => ({
            ...prev,
            email: "Please provide a valid email address.",
          }));
        }
      }
      if (key === "phone" && value) {
        const numberPattern = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(
          formData["phone"]
        );
        if (!numberPattern) {
          hasError = true;
          setFormErrorData((prev: any) => ({
            ...prev,
            phone:
              "Please provide numeric number or phone number is not right.",
          }));
        } else if (numberPattern && formData["phone"].length > 16) {
          hasError = true;
          setFormErrorData((prev: any) => ({
            ...prev,
            phone: "Please provide at least 16 digit phone number.",
          }));
        } else {
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
      positions: "",
      email: "",
      phone: "",
      address: "",
    });
    setFormErrorData({
      name: "",
      positions: "",
      email: "",
      phone: "",
    });
    setModalToggle(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkFormError = errorFromHandler();

    if (checkFormError)
      try {
        const res = await postData({
          endpoint: "teachers/teacher",
          data: formData,
          tags: ["teacher"],
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message);
        }
        closeAndresetForm();
      } catch (error: any) {}
  };
  return (
    <div>
      <Modal
        title="Add Teacher"
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        buttonName="Add Teacher"
      >
        <form onSubmit={handleSubmit}>
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
            label="Position"
            type="text"
            Icon={MdWork}
            name="positions"
            value={formData.positions}
            onChange={handleChange}
            star={true}
            error={formErrorData.positions}
          />

          <InputField
            label="Email"
            type="email"
            Icon={MdEmail}
            name="email"
            value={formData.email}
            onChange={handleChange}
            star={true}
            error={formErrorData.email}
          />

          <InputField
            label="Phone"
            type="tel"
            Icon={MdPhone}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            star={true}
            error={formErrorData.phone}
          />

          <InputField
            label="Address"
            type="text"
            Icon={MdHome}
            name="address"
            value={formData.address}
            onChange={handleChange}
            star={false}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white"
              disabled={isLoading}
            >
              Create Teacher
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTeacher;
