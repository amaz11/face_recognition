import { RxCross2 } from "react-icons/rx";
import { ModalType } from "../../utils/types/Types";
import { GoPencil } from "react-icons/go";

const UpdateModal = ({ title, children, modalToggle, setModalToggle, buttonName }: ModalType) => {
    return (
        <>
            <div
                className="flex-ic-jc justify-start gap-3 tableDropDownList"
                onClick={() => {
                    setModalToggle(!modalToggle);
                }}
            >
                <GoPencil size={15} />
                <span>{buttonName ? buttonName : "Edit"}</span>
            </div>
            {modalToggle ? (
                <div className="z-[60] fixed inset-0 flex justify-center items-center overflow-auto">
                    <div
                        className="top-0 left-0 z-[10] fixed bg-black opacity-40 w-full h-full"
                        onClick={() => setModalToggle(!modalToggle)}
                    ></div>
                    <div className="top-1/2 left-1/2 z-[1000] absolute bg-white p-4 rounded w-1/4 text-slate-700 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                        <div className="flex justify-between mb-3">
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <RxCross2
                                onClick={() => setModalToggle(!modalToggle)}
                                className="cursor-pointer"
                            />
                        </div>
                        {children}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default UpdateModal;
