"use client";

import { Box, Typography, useTheme } from "@mui/material";
import Title from "./components/Title";
// import KanbanBoard from "./components/Kanboard";
import AddApplication from "@/components/AddApplication";
import JobTable from "./components/TableData";
// import { slate, gray } from "@/theme/Color";
// import MultiSegmentCircle from "@/components/CircularProgressBar";
import { useState } from "react";
import CreateForm from "./components/CreateForm";
import axios from "axios";
import useSWR from "swr";
import UpdateForm from "./components/UpdateForm";
// import { Job } from "@/types/post";

const Dashboard = () => {
  const theme = useTheme();
  // const [open,setOpen] = useState(false)
  const [createForm, setCreateForm] = useState<{
    open: boolean;
  }>({
    open: false,
  });

  const [updateForm, setUpdateForm] = useState<{
    open: boolean;
  }>({
    open: false,
  });

  const handleOnClose = () => {
    setCreateForm({ open: false });
  };

  const { data, mutate } = useSWR("/api/posts", () =>
    axios.get("/api/posts").then((res) => {
      // console.log(res.data);
      return res.data;
    })
  );

  return (
    <Box
      component="section"
      sx={{
        padding: 2,
        marginX: "auto",
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "#F14A00",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{ fontWeight: "bold", fontSize: "30px" }}
          >
            JOB APPLICATION DASHBOARD
          </Typography>
          <Typography component="h4" sx={{ fontSize: "20px", opacity: 0.7 }}>
            Stay Organized, Land Your Dream Job
          </Typography>
        </Box>
        <Box
          onClick={() => {
            setCreateForm({ open: true });
            console.log(open);
          }}
        >
          <AddApplication />
        </Box>
      </Box>
      <Title />
      {/* <Box
        sx={{
          boxShadow: 4,
          p: 1,
          borderRadius: "8px",
          mt: 6,
          backgroundColor:
            theme.palette.mode === "dark" ? slate[700] : gray[800],
        }}
      >
        <KanbanBoard />
      </Box> */}

      <Box sx={{ mt: 6 }}>
        <JobTable
          data={data}
          setUpdateForm={setUpdateForm}
          open={updateForm.open}
        />
      </Box>
      <CreateForm open={createForm.open} handleOnClose={handleOnClose} />
      <UpdateForm open={updateForm.open} handleOnClose={handleOnClose} />
    </Box>
  );
};

export default Dashboard;
