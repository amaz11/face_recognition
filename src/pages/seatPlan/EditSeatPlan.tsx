import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { toast } from "react-toastify";
import {
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../service/endpoint";
import PageHeader from "../../Components/PageHeader";
import Loader from "../../Components/loader/Loader";

type Person = { id: number; name: string; email?: string; locked?: boolean };

const EditSeatPlan = () => {
  const { examId, examLogId, roomId } = useParams();
  const navigate = useNavigate();
  const [updateData, { isLoading: isSaving }] = useUpdateDataMutation();

  const { data, isLoading, isError } = useGetDataQuery({
    endpoint: `admin/seat-plan/${examLogId}/room/${roomId}`,
    tags: ["seat-plan"],
  });
  const detail = data?.data;

  const [students, setStudents] = useState<Person[]>([]);
  const [teachers, setTeachers] = useState<Person[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (detail) {
      setStudents(detail.students);
      setTeachers(detail.teachers);
    }
  }, [detail]);

  if (isLoading) return <Loader />;
  if (isError || !detail) {
    return (
      <div className="space-y-4">
        <p className="text-red-400">Failed to load this room.</p>
        <button className="btn-gray px-6" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  const capacity: number = detail.room.capacity;
  const overCapacity = students.length > capacity;
  const studentOptions: Person[] = [...detail.students, ...detail.studentOptions];
  const teacherOptions: Person[] = [...detail.teachers, ...detail.teacherOptions];
  const lockedIds = new Set<number>(
    detail.students.filter((s: Person) => s.locked).map((s: Person) => s.id)
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (overCapacity) {
      setError(`Room holds ${capacity}; ${students.length} selected.`);
      return;
    }
    try {
      const res = await updateData({
        endpoint: `admin/seat-plan/${examLogId}/room/${roomId}`,
        data: {
          student_ids: students.map((s) => s.id),
          teacher_ids: teachers.map((t) => t.id),
        },
        tags: ["seat-plan"],
      }).unwrap();
      if (res?.ok) {
        toast.success(res?.message);
        navigate(-1);
      }
    } catch (err: any) {
      const message = err?.data?.message ?? "Something went wrong, try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Seat Plan"
        description={`${detail.room.hallName}, room ${detail.room.roomNo} on ${
          detail.examLog.exam_date ?? "N/A"
        }`}
        actions={
          <button
            type="button"
            className="btn-gray px-6"
            onClick={() => navigate(-1)}
          >
            Back to seat plans
          </button>
        }
        stats={[
          {
            label: "Students",
            value: `${students.length} / ${capacity}`,
            badge: overCapacity ? "Over capacity" : "Within capacity",
          },
          {
            label: "Invigilators",
            value: `${teachers.length}`,
            badge: `Exam ID: ${examId}`,
          },
        ]}
      />
      <section className="rounded-3xl border border-slate-100 bg-white p-4 md:p-6 shadow-lg shadow-slate-200/60">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Autocomplete
              multiple
              options={studentOptions}
              getOptionLabel={(o) => o.name}
              isOptionEqualToValue={(a, b) => a.id === b.id}
              value={students}
              onChange={(_, selected) => {
                // locked students can never be dropped
                const keep = detail.students.filter((s: Person) =>
                  lockedIds.has(s.id)
                );
                const merged = [
                  ...keep,
                  ...selected.filter((s) => !lockedIds.has(s.id)),
                ];
                setStudents(merged);
                setError("");
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      {...tagProps}
                      label={
                        option.locked
                          ? `${option.name} (attendance recorded)`
                          : option.name
                      }
                      onDelete={option.locked ? undefined : tagProps.onDelete}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Students"
                  error={overCapacity}
                  helperText={
                    overCapacity ? `Room holds ${capacity} students.` : ""
                  }
                />
              )}
            />
            <Autocomplete
              multiple
              options={teacherOptions}
              getOptionLabel={(o) => `${o.name} (${o.email})`}
              isOptionEqualToValue={(a, b) => a.id === b.id}
              value={teachers}
              onChange={(_, selected) => {
                setTeachers(selected);
                setError("");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Invigilators" />
              )}
            />
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary px-6"
              disabled={isSaving || overCapacity}
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditSeatPlan;
