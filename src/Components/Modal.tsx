import { RxCross2 } from "react-icons/rx";
import { ModalType } from "../utils/types/Types";

const Modal = ({ title, children, modalToggle, setModalToggle, buttonName, classcss, icon }: ModalType) => {
  return (
    <>
      <div className="flex justify-end px-4">
        <button
          className={`${classcss === undefined || null ? 'bg-[#1d69fa] text-white flex items-center gap-2 px-4 py-2 rounded-full' : classcss}`}
          onClick={() => setModalToggle(!modalToggle)}
        >
          {icon === undefined || null ? null : icon}
          <span className='font-semibold'>
            {buttonName}
          </span>
        </button>
      </div>
      {modalToggle ? (
        <>
          <div
            className="top-0 left-0 z-10 fixed bg-black opacity-40 w-full h-full"
            onClick={() => setModalToggle(!modalToggle)}
          ></div>
          <div className="top-1/2 left-1/2 z-10 absolute bg-white p-4 rounded w-1/4 overflow-hidden text-slate-700 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-lg">{title}</h3>
              <RxCross2
                onClick={() => setModalToggle(!modalToggle)}
                className="cursor-pointer"
              />
            </div>
            {children}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
