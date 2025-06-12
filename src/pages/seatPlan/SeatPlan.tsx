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

const SeatPlan = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_event: any, newValue: any) => {
    setTabIndex(newValue);
  };

  const { examId, exam } = useParams();
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
  console.log(data);
  const navigate = useNavigate();
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

      return (
        <Box sx={{ p: 2 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="detail panel tabs"
          >
            <Tab label="Invigilators" />
            <Tab label="Students" />
          </Tabs>

          {tabIndex === 0 && (
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

          {tabIndex === 1 && (
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
    <div>
      <div className="flex justify-end px-4">
        <button
          className={`bg-[#1d69fa] text-white flex items-center gap-2 px-4 py-2 rounded-full`}
          onClick={() => {
            navigate(`/seat-plan/${examId}/${exam}/create`);
          }}
        >
          <span className="font-semibold">Create Seat Plan</span>
        </button>
      </div>
      <div className="mt-10">
        <div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default SeatPlan;
