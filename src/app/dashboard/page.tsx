"use client";

import { Alert, Box, Snackbar, Typography } from "@mui/material";
import Title from "./components/Title";
import AddApplication from "@/components/AddApplication";
import JobTable from "./components/TableData";
import { useState } from "react";
import CreateForm from "./components/CreateForm";
import axios from "axios";
import useSWR from "swr";
// 1. Import useSWRMutation
import useSWRMutation from "swr/mutation"; 
import UpdateForm from "./components/UpdateForm";
import { fetcher } from "@/lib/fetcher";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface JobApplication {
  id: string; 
  jobTitle: string; 
}

const APPLICATIONS_KEY = "/api/posts"; 

const Dashboard = () => {
  // Update selected type to JobApplication or null
  const [selected, setSelected] = useState<JobApplication | null>(null); 
  const [snackOpen, setSnackOpen] = useState(false);
  const [openConfirmedBox, setOpenConfirmedBox] = useState(false); // Renamed to match the variable name
  
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

  const deleteHandle = async (
    url: string,
    { arg }: { arg: { id: string } }
  ) => {
    const response = await fetch(`${url}/${arg.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete job application.");
    }
    return arg.id;
  };

  // useSWR hook for fetching the list data
  const { data, mutate } = useSWR(APPLICATIONS_KEY, () =>
    axios.get(APPLICATIONS_KEY).then((res) => {
      return res.data;
    })
  );

  //useSWRMutation hook for the delete operation
  const { trigger: deleteTrigger, isMutating: isDeleting } = useSWRMutation(
    APPLICATIONS_KEY,
    deleteHandle,
    {
      onSuccess: () => {
        mutate(); 
        setSnackOpen(true);
        setOpenConfirmedBox(false); // Close the dialog
      },
      onError: (error) => {
        console.error("Delete Error:", error);
        alert("Deletion failed. Please try again.");
        setOpenConfirmedBox(false); // Close the dialog
      },
    }
  );

  const { data: jobStatus, mutate: statusMutation } = useSWR(
    "/api/user/jobs",
    fetcher
  );

  const deleteHandler = () => {
    if (selected) {
      // Trigger the delete mutation with the ID of the selected row
      deleteTrigger({ id: selected.id });
      // The rest of the success/error handling is managed by useSWRMutation hooks
    } else {
      console.log("No application selected for deletion.");
      setOpenConfirmedBox(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        padding: 2,
        marginX: "auto",
        display: "flex",
        flexDirection: "column",
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
          }}
        >
          <AddApplication />
        </Box>
      </Box>
      <Title jobStatus={jobStatus} />

      <Box sx={{ mt: 6 }}>
        <JobTable
          data={data}
          setSelected={setSelected} // Set the row data when 'delete' is clicked
          setUpdateForm={setUpdateForm}
          setOpenComfirmedBox={setOpenConfirmedBox} // Open the confirmation dialog
        />
      </Box>
      
      {/* ... (CreateForm and UpdateForm) ... */}
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
          {isDeleting ? "Deleting..." : "Success!"} 
        </Alert>
      </Snackbar>

      {/*  Dialog for Delete Confirmation */}
      <Dialog
        open={openConfirmedBox}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {selected 
            ? `Are you sure you want to delete the application for "${selected.id}"?` 
            : "Are you sure to delete this application?"}
        </DialogTitle>

        <DialogActions>
          <Button autoFocus onClick={() => setOpenConfirmedBox(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button autoFocus onClick={deleteHandler} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;