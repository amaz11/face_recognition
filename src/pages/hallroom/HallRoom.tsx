import { Box, Chip, Stack } from "@mui/material";
import CreateInstitutionForm from "../../Components/modal/hallRoom/AddHall";
import AddRoom from "../../Components/modal/hallRoom/AddRoom";
import UpdateInstitutionForm from "../../Components/modal/hallRoom/UpdateHall";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import { useGetDataQuery } from "../../service/endpoint";
import useModalHooks from "../../utils/hooks/modalHooks";
import UpdateRoom from "../../Components/modal/hallRoom/UpdateRoom";
import { useState } from "react";
import { DeleteModal } from "../../Components/modal/Delete/DeleteModal";
import PageHeader from "../../Components/PageHeader";

const HallRoom = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError: _isError,
    error: _error,
    refetch,
  } = useGetDataQuery({ endpoint: "exam_hall", tags: ["exam_hall"] });
  const { modalToggle, setModalToggle } = useModalHooks();
  const [currentData, setCurrentData] = useState({});
  const [currentModal, setCurrentModal] = useState("");
  const halls = data?.data ?? [];
  const totalRooms = halls.reduce(
    (sum: number, hall: any) => sum + (hall?.hall_rooms?.length ?? 0),
    0
  );

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "eiin",
      header: "EIIN",
    },
  ];
  const tableObject = {
    renderTopToolbarCustomActions: () => {
      return (
        <div className="mb-5 ml-4">
          <h1 className="mt-5 font-semibold text-2xl">Hall's Table</h1>
        </div>
      );
    },
    // Expandable row detail
    renderDetailPanel: ({ row }: { row: any }) => {
      const hallRooms = row.original.hall_rooms;

      if (!hallRooms || hallRooms.length === 0) {
        return <div style={{ padding: "16px" }}>No rooms available</div>;
      }

      return (
        <Stack
          direction="row"
          spacing={1}
          rowGap={2}
          flexWrap="wrap"
          padding={2}
        >
          {hallRooms.map((room: any) => (
            <Box
              key={room.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentData(room);
                setModalToggle(true);
                setCurrentModal("updateRoom");
              }}
            >
              <Chip
                label={`Room ${room.roomNo} (Capacity: ${room.capacity})`}
                color="primary"
                variant="outlined"
                sx={{
                  cursor: "pointer",
                }}
                deleteIcon={
                  <DeleteModal
                    tags={["exam_hall"]}
                    endpoint="hall_rooms"
                    setCurrentModal={setCurrentModal}
                  />
                }
                onDelete={(e) => {
                  e.stopPropagation();
                  e.stopPropagation();
                  setCurrentModal("");
                }}
              />
            </Box>
          ))}
        </Stack>
      );
    },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hall & Room Directory"
        description="Manage all venues, capacity, and EIIN info before assigning seat plans."
        actions={
          <>
            <AddRoom />
            <CreateInstitutionForm />
          </>
        }
        stats={[
          {
            label: "Exam Halls",
            value: halls.length ? `${halls.length}` : "--",
            badge: "Onboarded",
          },
          {
            label: "Total Rooms",
            value: totalRooms ? `${totalRooms}` : "--",
            badge: "Ready for allocation",
          },
        ]}
      />
      <section className="rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60">
        <MaterialsTable
          tableObject={tableObject}
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          endpoint="exam_hall"
          tags={["exam_hall"]}
          refetch={refetch}
          seeDetails={false}
          UpdateList={UpdateInstitutionForm}
        />
      </section>

      {currentData && modalToggle && currentModal === "updateRoom" && (
        <UpdateRoom
          row={currentData}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        />
      )}
    </div>
  );
};

export default HallRoom;
