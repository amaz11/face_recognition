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
    refetch: () => void;
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
                refetch();
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
                className="flex-ic-jc tableDropDownList border-b-0 gap-3"
                onClick={() => {
                    setModalToggle(!modalToggle);
                }}
            >
                <RiDeleteBin2Line size={15} />
                <span>Delete</span>
            </div>
            {modalToggle ? (
                <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-auto">
                    <div
                        className="fixed inset-0 bg-black opacity-40"
                        onClick={() => setModalToggle(!modalToggle)}
                    ></div>
                    <div
                        className={`relative bg-white p-4 rounded my-8 w-[95%] md:w-[40%] lg:w-auto`}
                    >
                        <div className="flex justify-between mb-3">
                            <h3 className="font-semibold text-lg"></h3>
                            <RxCross2
                                onClick={() => setModalToggle(!modalToggle)}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="">
                            <div className="flex items-center justify-between space-x-4">
                                <h1 className="text-xl font-bold text-gray-800 ">
                                    Are you sure delete?
                                </h1>
                            </div>

                            <p className="mt-2 text-md text-gray-800">
                                If you continue, you will permanently delete this record. Are
                                you sure you want to continue?
                            </p>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => {
                                        setModalToggle(!modalToggle);
                                    }}
                                    type="button"
                                    className="mr-2 px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 hover:bg-gray-600 rounded-md shadow-md"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => handleDelete()}
                                    disabled={isLoading || false}
                                    type="button"
                                    className="mr-2 px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-500 hover:bg-red-600 rounded-md shadow-md"
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