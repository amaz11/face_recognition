import Modal from "../Modal";

const PSCModal = () => {
  return (
    <>
      <Modal title={"File Upload"}>
        <>
          <div>
            <form action="">
              <label className="mb-2 font-semibold" htmlFor="">
                Routine File
              </label>
              <input
                className="file:py-1.5 file:p-2 file:mr-5 file:rounded file:bg-blue-500 file:border-blue-500 file:drop-shadow-none border border-blue-500 rounded mb-3 w-full file:text-white file:font-semibold"
                type="file"
                name=""
                id=""
              />
              <label className="mb-2 font-semibold" htmlFor="">
                Teachers File
              </label>

              <input
                className="file:py-1.5 file:p-2 file:mr-5 file:rounded file:bg-blue-500 file:border-blue-500 file:drop-shadow-none border border-blue-500 rounded mb-3 w-full file:text-white file:font-semibold"
                type="file"
                name=""
                id=""
              />
              <button
                id="button"
                type="submit"
                className="border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold rounded py-2 px-2 mt-3 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      </Modal>
    </>
  );
};

export default PSCModal;
