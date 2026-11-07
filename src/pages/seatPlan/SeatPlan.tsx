import { useNavigate, useParams } from "react-router-dom";
import { useGetDataQuery } from "../../service/endpoint";
import MaterialsTable from "../../Components/table/materialTable/MaterialTable";
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PageHeader from "../../Components/PageHeader";

const SeatPlan = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_event: any, newValue: any) => {
    setTabIndex(newValue);
  };

  const { examId, exam } = useParams();
  const navigateTo = useNavigate();
  const {
    data,
    isLoading,
    isFetching,
    isError: _isError,
    error: _error,
    refetch,
  } = useGetDataQuery({
    endpoint: `admin/exam-log/${examId}`,
    tags: ["seat-plan"],
  });
  const navigate = useNavigate();
  const schedules = data?.data ?? [];
  const totalSessions = schedules.length;
  const totalTeachers = schedules.reduce(
    (sum: number, session: any) => sum + (session?.teachers_log?.length ?? 0),
    0
  );
  const totalStudents = schedules.reduce(
    (sum: number, session: any) => sum + (session?.student_exam_log?.length ?? 0),
    0
  );
  const columns = [
    {
      accessorKey: "exam_year",
      header: "Exam Year",
    },
    {
      accessorKey: "exam_date",
      header: "Exam Date",
    },
    {
      accessorKey: "exam_start",
      header: "Start Time",
    },
    {
      accessorKey: "exam_end",
      header: "End Time",
    },
    {
      accessorKey: "registration_deadline",
      header: "Registration Deadline",
    },
    {
      accessorKey: "exam.name",
      header: "Exam Name",
    },
  ];

  const tableObject = {
    renderTopToolbarCustomActions: () => {
      return (
        <div className="mb-5 ml-4">
          <h1 className="mt-5 font-semibold text-2xl">Seat Plan Table</h1>
        </div>
      );
    },
    // Expandable row detail
    renderDetailPanel: ({ row }: { row: any }) => {
      const teachers = row.original.teachers_log || [];
      const students = row.original.student_exam_log || [];

      // Group by room so each room can be edited on its own.
      const rooms = new Map<number, any>();
      const ensureRoom = (room: any) => {
        if (!rooms.has(room.id)) {
          rooms.set(room.id, {
            id: room.id,
            roomNo: room.roomNo,
            capacity: room.capacity,
            hallName: room.hall?.name ?? "",
            students: 0,
            teachers: 0,
          });
        }
        return rooms.get(room.id);
      };
      students.forEach((l: any) => {
        if (l.hall_room) ensureRoom(l.hall_room).students += 1;
      });
      teachers.forEach((l: any) =>
        (l.room_duty || []).forEach((r: any) => (ensureRoom(r).teachers += 1))
      );
      const unseated = students.filter((l: any) => !l.hall_room).length;

      return (
        <Box sx={{ p: 2 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="detail panel tabs"
          >
            <Tab label="Rooms" />
            <Tab label="Invigilators" />
            <Tab label="Students" />
          </Tabs>

          {tabIndex === 0 && (
            <Box mt={2}>
              {rooms.size > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Hall</TableCell>
                      <TableCell>Room</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Invigilators</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...rooms.values()].map((room: any) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.hallName}</TableCell>
                        <TableCell>{room.roomNo}</TableCell>
                        <TableCell>
                          {room.students} / {room.capacity}
                        </TableCell>
                        <TableCell>{room.teachers}</TableCell>
                        <TableCell>
                          <button
                            type="button"
                            className="btn-primary px-4"
                            onClick={() =>
                              navigateTo(
                                `/seat-plan/${examId}/${exam}/edit/${row.original.id}/${room.id}`
                              )
                            }
                          >
                            Edit
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No rooms planned yet.</Typography>
              )}
              <Typography mt={1} variant="body2">
                Unseated students: {unseated}
              </Typography>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box mt={2}>
              {teachers.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Position</TableCell>
                      <TableCell>Duty No</TableCell>
                      <TableCell>Duty Done</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map((log: any) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.teacher.name}</TableCell>
                        <TableCell>{log.teacher.email}</TableCell>
                        <TableCell>{log.teacher.phone}</TableCell>
                        <TableCell>{log.teacher.address}</TableCell>
                        <TableCell>{log.teacher.positions}</TableCell>
                        <TableCell>{log.duty_no}</TableCell>
                        <TableCell>{log.duty_doen ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No teachers assigned.</Typography>
              )}
            </Box>
          )}

          {tabIndex === 2 && (
            <Box mt={2}>
              {students.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Roll</TableCell>
                      <TableCell>Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((log: any) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.student.name}</TableCell>
                        <TableCell>{log.student.email}</TableCell>
                        <TableCell>{log.student.phone}</TableCell>
                        <TableCell>{log.roll}</TableCell>
                        <TableCell>{log.result}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No students assigned.</Typography>
              )}
            </Box>
          )}
        </Box>
      );
    },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Seat Planning Console"
        description="Assign invigilators and seat every candidate before exam day."
        actions={
          <button
            className="btn-primary px-6"
            onClick={() => navigate(`/seat-plan/${examId}/${exam}/create`)}
          >
            Create Seat Plan
          </button>
        }
        stats={[
          {
            label: "Exam Sessions",
            value: totalSessions ? `${totalSessions}` : "--",
            badge: `Exam ID: ${examId}`,
          },
          {
            label: "Assignments",
            value: `${totalTeachers + totalStudents}`,
            badge: `${totalTeachers} invigilators · ${totalStudents} students`,
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
          endpoint="admin/seat-plan"
          tags={["seat-plan"]}
          refetch={refetch}
          seeDetails={false}
        />
      </section>
    </div>
  );
};

export default SeatPlan;
