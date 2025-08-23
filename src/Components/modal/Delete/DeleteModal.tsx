import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDeleteDataMutation } from "../../../service/endpoint";

export const DeleteModal = ({
  tags,
  endpoint,
  refetch,
}: {
  tags: string[];
  endpoint: string;
  refetch?: () => void;
  setCurrentModal?: any;
}) => {
  const [deleteData, { isLoading }] = useDeleteDataMutation();
  const [modalToggle, setModalToggle] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await deleteData({
        endpoint,
        tags,
      }).unwrap();
      if (res?.success) {
        setModalToggle(false);
        if (refetch) {
          refetch();
        }
        toast.success(res?.message);
      } else {
        toast.error(res?.error?.data.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <div
        className="tableDropDownList flex-ic-jc gap-3 border-b-0"
        onClick={(e) => {
          e.stopPropagation();
          setModalToggle(!modalToggle);
        }}
      >
        <RiDeleteBin2Line size={15} />
        <span>Delete</span>
      </div>
      {modalToggle ? (
        <div className="z-[60] fixed inset-0 flex justify-center items-center overflow-auto">
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={(e) => {
              e.stopPropagation();
              setModalToggle(!modalToggle);
            }}
          ></div>
          <div
            className={`relative bg-white p-4 rounded my-8 w-[95%] md:w-[40%] lg:w-auto`}
          >
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-lg"></h3>
              <RxCross2
                onClick={(e: any) => {
                  e.stopPropagation();
                  setModalToggle(!modalToggle);
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="">
              <div className="flex justify-between items-center space-x-4">
                <h1 className="font-bold text-gray-800 text-xl">
                  Are you sure delete?
                </h1>
              </div>

              <p className="mt-2 text-gray-800 text-md">
                If you continue, you will permanently delete this record. Are
                you sure you want to continue?
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalToggle(!modalToggle);
                  }}
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 shadow-md mr-2 px-2 py-2 rounded-md text-white text-sm capitalize tracking-wide transition-colors duration-200 transform"
                >
                  Back
                </button>
                <button
                  onClick={() => handleDelete()}
                  disabled={isLoading || false}
                  type="button"
                  className="bg-red-500 hover:bg-red-600 shadow-md mr-2 px-2 py-2 rounded-md text-white text-sm capitalize tracking-wide transition-colors duration-200 transform"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
