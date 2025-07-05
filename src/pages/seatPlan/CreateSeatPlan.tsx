import { useNavigate, useParams } from "react-router-dom";
import { useGetDataQuery, usePostDataMutation } from "../../service/endpoint";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";

const CreateSeatPlan = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [postData, { isLoading: isPostLoading }] = usePostDataMutation();
  const { data, isLoading, error, isError } = useGetDataQuery({
    endpoint: `exams/${examId}`,
    tags: ["seat-plan"],
  });
  const {
    data: hallRoomData,
    isLoading: isHallRoomLoading,
    isError: _isHallRoomError,
    error: _hallRoomError,
  } = useGetDataQuery({ endpoint: "exam_hall", tags: ["exam_hall"] });

  const [formData, setFormData] = useState<any>({
    hallId: "none",
    hallRoomId: "none",
    examScheduleId: undefined,
    studentIds: [],
    teacherIds: [],
  });

  const [formErrorData, setFormErrorData] = useState<any>({
    hallId: "",
    hallRoomId: "",
    examScheduleId: "",
    studentIds: "",
    teacherIds: "",
  });
  const {
    data: studentsData,
    isLoading: isStudentsLoading,
    isError: _isStudentError,
    error: _StudentError,
  } = useGetDataQuery(
    { endpoint: `admin/students/exam-log/${formData.examScheduleId}` },
    {
      skip: formData.examScheduleId === undefined,
    }
  );

  const {
    data: teachersData,
    isLoading: isteachersLoading,
    isError: _isteachersError,
    error: _teachersError,
  } = useGetDataQuery(
    { endpoint: `admin/all-teacher` },
    {
      skip: formData.examScheduleId === undefined,
    }
  );

  const studentOptions = studentsData?.data || [];
  const teacherOptions = teachersData?.data || [];
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFormData = (
    formData: {
      examScheduleId?: number;
      hallId?: string;
      hallRoomId?: string;
      studentIds: number[];
      teacherIds: number[];
    },
    setFormErrorData: Function
  ) => {
    const errors: any = {
      examScheduleId: "",
      hallId: "",
      hallRoomId: "",
      studentIds: "",
      teacherIds: "",
    };

    let isValid = true;

    if (formData.examScheduleId === undefined) {
      errors.examScheduleId = "Exam Schedule is required.";
      isValid = false;
    }

    if (!formData.hallId || formData.hallId === "none") {
      errors.hallId = "Hall must be selected.";
      isValid = false;
    }

    if (!formData.hallRoomId || formData.hallRoomId === "none") {
      errors.hallRoomId = "Hall Room must be selected.";
      isValid = false;
    }

    if (!formData.studentIds || formData.studentIds.length === 0) {
      errors.studentIds = "At least one student must be selected.";
      isValid = false;
    }

    if (!formData.teacherIds || formData.teacherIds.length === 0) {
      errors.teacherIds = "At least one teacher must be selected.";
      isValid = false;
    }

    setFormErrorData(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = validateFormData(formData, setFormErrorData);
      if (!isValid) {
        return; // Prevent submission
      } else {
        const output = {
          student_ids: formData.studentIds,
          teacher_ids: formData.teacherIds,
          hall_room_id: Number(formData.hallRoomId),
          exam_log_id: Number(formData.examScheduleId),
        };
        const res = await postData({
          endpoint: "admin/create/seat-plan",
          data: output,
          tags: ["seat-plan"],
        }).unwrap();

        if (res?.ok) {
          navigate(-1);
          toast.success(res?.message);
        }
      }
    } catch (error) {
      toast.error("Something wnt wrong, Try again.");
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="exam_schedule"
            className="pb-2 font-semibold text-sm starAfter"
          >
            Exam Date
          </label>
          <select
            name="examScheduleId"
            value={formData.examScheduleId}
            onChange={handleSelectChange}
            className="px-3 py-2 border border-slate-500 rounded focus:outline-[#1d69fa]"
            disabled={isLoading}
          >
            <option value="none">Select Exam Date</option>
            {data?.exam_log?.map(({ id, exam_date }: any) => (
              <option key={id} value={id}>
                {exam_date ? exam_date : "N/A"}
              </option>
            ))}
          </select>
          {formData.examScheduleId === undefined ||
          formData.examScheduleId === "none" ||
          isError ? (
            <span className="pt-2 text-red-400">
              {error || formErrorData.examScheduleId}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 mb-3">
          {/* Hall Selection */}
          <div className="flex flex-col">
            <label className="pb-2 font-semibold text-sm starAfter">
              Select Hall
            </label>
            <select
              name="hall_id"
              value={formData.hallId}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                setFormData({
                  ...formData,
                  hallId: selectedId,
                  hallRoomId: "none", // reset hall room selection
                });
              }}
              className="px-3 py-2 border border-slate-500 rounded focus:outline-[#1d69fa]"
              disabled={isHallRoomLoading}
            >
              <option value="none">Select Hall</option>
              {hallRoomData?.data?.map(({ id, name }: any) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {formData.hallId === "none" || formData.hallId === undefined ? (
              <span className="pt-2 text-red-400">
                {error || formErrorData.hallId}
              </span>
            ) : null}
          </div>

          {/* Hall Room Selection */}
          {formData.hallId && formData.hallId !== "none" && (
            <div className="flex flex-col">
              <label className="pb-2 font-semibold text-sm starAfter">
                Select Hall Room
              </label>
              <select
                name="hallRoomId"
                value={formData.hallRoomId}
                onChange={handleSelectChange}
                className="px-3 py-2 border border-slate-500 rounded focus:outline-[#1d69fa]"
              >
                <option value="none">Select Room</option>
                {hallRoomData?.data
                  ?.find((hall: any) => hall.id === Number(formData.hallId))
                  ?.hall_rooms.map(({ id, roomNo }: any) => (
                    <option key={id} value={id}>
                      {roomNo}
                    </option>
                  ))}
              </select>
              {formData.hallRoomId === "none" ||
              formData.hallRoomId === undefined ? (
                <span className="pt-2 text-red-400">
                  {error || formErrorData.hallRoomId}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <Autocomplete
          className="mb-4"
          multiple
          options={studentOptions}
          loading={isStudentsLoading}
          getOptionLabel={(option) => option?.student?.name ?? "Unknown"}
          value={studentOptions.filter((opt: any) =>
            formData.studentIds?.includes(opt.student.id)
          )}
          onChange={(_, selectedOptions) => {
            const selectedIds = selectedOptions.map((opt) => opt.student.id);
            setFormData({ ...formData, studentIds: selectedIds });
            setFormErrorData({ ...formErrorData, studentIds: "" });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Students"
              placeholder="Students"
              error={formErrorData?.studentIds?.length > 0}
              helperText={formErrorData?.studentIds}
            />
          )}
        />

        <Autocomplete
          multiple
          options={teacherOptions}
          loading={isteachersLoading}
          getOptionLabel={(option) => `${option.name} (${option.email})`}
          value={teacherOptions?.filter((opt: any) =>
            formData.teacherIds.includes(opt.id)
          )}
          onChange={(_, selectedOptions) => {
            const selectedIds = selectedOptions.map((opt) => opt.id);
            setFormData({ ...formData, teacherIds: selectedIds });
            setFormErrorData({ ...formErrorData, teacherIds: "" });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Teachers"
              placeholder="Teachers"
              error={formErrorData?.teacherIds?.length > 0}
              helperText={formErrorData?.teacherIds}
            />
          )}
        />
        <div className="flex justify-end mt-3 px-4">
          <button
            className={`bg-[#1d69fa] text-white flex items-center gap-2 px-4 py-2 rounded-full`}
            type="submit"
            disabled={
              isPostLoading ||
              isLoading ||
              isStudentsLoading ||
              isteachersLoading
            }
          >
            <span className="font-semibold">Create Seat Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSeatPlan;
