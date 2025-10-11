import Table from "../Components/table/Table";

const Home = () => {

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'age', headerName: 'Age' },
    { field: 'item1', headerName: 'Item 1' }, // Additional columns for complex data
    { field: 'item2', headerName: 'Item 2' }
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 21, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, item1: { subItem: "subitem" }, item2: [{ arrItem: "arrItem" }] }
  ];

  return <div className="overflow-hidden">
    <div className="border mb-8 rounded-md">
      <div className="py-4 px-8 font-bold text-[20px]">
        Exam Date
      </div>
      <div className="border-t">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead >
                <tr>
                  <th className="px-8 py-4 border-b-1 border-white bg-gray-500  text-left text-xs font-semibold uppercase tracking-wider">
                    Exam Name
                  </th>
                  <th className="px-8 py-4 border-b-1  border-white bg-gray-500  text-left text-xs font-semibold  uppercase tracking-wider">
                    Exam Date
                  </th>
                  <th className="px-8 py-4 border-b-1 border-white bg-gray-500   text-left text-xs font-semibold  uppercase tracking-wider">
                    Exam Place
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="px-8 py-4 text-sm">
                    <p className=" whitespace-no-wrap">BCS Exam</p>
                  </td>
                  <td className="px-8 py-4  text-sm">
                    <p className=" whitespace-no-wrap">12/12/23</p>
                  </td>
                  <td className="px-8 py-4 text-sm">
                    <p className=" whitespace-no-wrap">Dhaka</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center gap-7">
      <div className="border rounded-md w-full ">
        <div className="py-4 px-8 font-bold text-[20px]">
          Exam Date
        </div>
        <div className=" border-t">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="">
                  <tr>
                    <th className="px-8 py-4 border-b-1 border-white bg-gray-500   text-left text-xs font-semibold uppercase tracking-wider">
                      Exam Name
                    </th>
                    <th className="px-8 py-4 border-b-1  border-white bg-gray-500   text-left text-xs font-semibold  uppercase tracking-wider">
                      Exam Date
                    </th>
                    <th className="px-8 py-4 border-b-1 border-white bg-gray-500    text-left text-xs font-semibold  uppercase tracking-wider">
                      Exam Place
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-8 py-4 text-sm">
                      <p className=" whitespace-no-wrap">BCS Exam</p>
                    </td>
                    <td className="px-8 py-4  text-sm">
                      <p className=" whitespace-no-wrap">12/12/23</p>
                    </td>
                    <td className="px-8 py-4 text-sm">
                      <p className=" whitespace-no-wrap">Dhaka</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-md w-full">
        <div className="py-4 px-8 font-bold text-[20px]">
          Exam Date
        </div>
        <div className=" border-t">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="">
                  <tr>
                    <th className="px-8 py-4 border-b-1 border-white bg-gray-500   text-left text-xs font-semibold uppercase tracking-wider">
                      Exam Name
                    </th>
                    <th className="px-8 py-4 border-b-1  border-white bg-gray-500   text-left text-xs font-semibold  uppercase tracking-wider">
                      Exam Date
                    </th>
                    <th className="px-8 py-4 border-b-1 border-white bg-gray-500    text-left text-xs font-semibold  uppercase tracking-wider">
                      Exam Place
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="px-8 py-4 text-sm">
                      <p className=" whitespace-no-wrap">BCS Exam</p>
                    </td>
                    <td className="px-8 py-4  text-sm">
                      <p className=" whitespace-no-wrap">12/12/23</p>
                    </td>
                    <td className="px-8 py-4 text-sm">
                      <p className=" whitespace-no-wrap">Dhaka</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Table columns={columns} rows={rows} />
  </div>;
};

export default Home;
