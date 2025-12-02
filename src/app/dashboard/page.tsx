"use client";

import { Alert, Box, Snackbar, Typography } from "@mui/material";
import Title from "./components/Title";
// import KanbanBoard from "./components/Kanboard";
import AddApplication from "@/components/AddApplication";
import JobTable from "./components/TableData";
// import { slate, gray } from "@/theme/Color";
import { useState } from "react";
import CreateForm from "./components/CreateForm";
import axios from "axios";
import useSWR from "swr";
import UpdateForm from "./components/UpdateForm";
import { fetcher } from "@/lib/fetcher";

const Dashboard = () => {
  const [selected, setSelected] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
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

  const handleOnClose = (status: string) => {
    if (status === "create") {
      setCreateForm({ open: false });
    } else if (status === "update") {
      setUpdateForm({ open: false });
    }
  };

  const { data, mutate } = useSWR("/api/posts", () =>
    axios.get("/api/posts").then((res) => {
      return res.data;
    })
  );

  const { data: jobStatus, mutate : statusMutation } = useSWR(
    "/api/user/jobs",
    fetcher
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
      <Title jobStatus={jobStatus} />
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
          setSelected={setSelected}
          setUpdateForm={setUpdateForm}
        />
      </Box>
      <CreateForm
        open={createForm.open}
        handleOnClose={() => handleOnClose("create")}
      />
      <UpdateForm
        mutate={mutate}
        statusMutation={statusMutation}
        open={updateForm.open}
        handleOnClose={() => handleOnClose("update")}
        selected={selected}
        setSnackOpen={setSnackOpen}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Updated Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
