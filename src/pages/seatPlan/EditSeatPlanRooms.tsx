import { useNavigate, useParams } from "react-router-dom";
import UpdateModal from "../../Components/modal/UpdateModal";
import useModalHooks from "../../utils/hooks/modalHooks";

/**
 * Row-action "Edit" for one exam date: lists the rooms planned for that date
 * and opens the edit screen for the chosen room.
 */
const EditSeatPlanRooms = ({ id, row }: { id: any; row: any }) => {
  const { modalToggle, setModalToggle } = useModalHooks();
  const navigate = useNavigate();
  const { examId, exam } = useParams();

  const rooms = new Map<number, any>();
  const ensure = (r: any) => {
    if (!rooms.has(r.id)) {
      rooms.set(r.id, {
        id: r.id,
        roomNo: r.roomNo,
        capacity: r.capacity,
        hallName: r.hall?.name ?? "",
        students: 0,
        teachers: 0,
      });
    }
    return rooms.get(r.id);
  };
  (row?.student_exam_log ?? []).forEach((l: any) => {
    if (l.hall_room) ensure(l.hall_room).students += 1;
  });
  (row?.teachers_log ?? []).forEach((l: any) =>
    (l.room_duty ?? []).forEach((r: any) => (ensure(r).teachers += 1))
  );

  return (
    <UpdateModal
      title={`Edit seat plan (${row?.exam_date ?? "N/A"})`}
      modalToggle={modalToggle}
      setModalToggle={setModalToggle}
      buttonName="Edit seat plan"
    >
      {rooms.size === 0 ? (
        <p className="text-slate-500">
          No rooms are planned for this date yet. Use "Create Seat Plan" first.
        </p>
      ) : (
        <ul className="space-y-2">
          {[...rooms.values()].map((room: any) => (
            <li
              key={room.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2"
            >
              <div>
                <p className="font-semibold">
                  {room.hallName} / Room {room.roomNo}
                </p>
                <p className="text-sm text-slate-500">
                  {room.students} / {room.capacity} students, {room.teachers}{" "}
                  invigilators
                </p>
              </div>
              <button
                type="button"
                className="btn-primary px-4"
                onClick={() =>
                  navigate(
                    `/seat-plan/${examId}/${exam}/edit/${id}/${room.id}`
                  )
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </UpdateModal>
  );
};

export default EditSeatPlanRooms;
