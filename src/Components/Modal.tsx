import { RxCross2 } from "react-icons/rx";
import { ModalType } from "../utils/types/Types";
import { useState } from "react";

const Modal = ({ title, children }: ModalType) => {
  const [modalToggle, setModalToggle] = useState(false);
  return (
    <>
      <div className="flex justify-end px-4">
        <button
          className="bg-blue-500 py-1.5 px-2 rounded font-semibold text-white"
          onClick={() => setModalToggle(!modalToggle)}
        >
          File Upload
        </button>
      </div>
      {modalToggle ? (
        <>
          <div
            className="bg-black opacity-40 fixed w-full h-full top-0 left-0 z-10"
            onClick={() => setModalToggle(!modalToggle)}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded p-4 z-10 w-1/4 overflow-hidden">
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
