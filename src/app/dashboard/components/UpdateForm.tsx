"use client";
import FormDialog from "@/components/FormDialog";
import TextInput from "@/components/TextField";
import { FormDialogType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";

const JobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  salary: z.string().optional(),
  appliedDate: z.string().min(1, "Applied date required"),
  jobLink: z.any().optional(),
  notes: z.string().optional(),
  status: z.string().min(1, "Status is required"),
});

export type JobFormValues = z.infer<typeof JobSchema>;

const UpdateForm = ({
  open,
  handleOnClose,
  selected,
  mutate,
  setSnackOpen,
}: FormDialogType & {
  selected: any;
  mutate: any;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { control, handleSubmit, reset } = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      company: "",
      position: "",
      salary: "",
      appliedDate: "",
      jobLink: null,
      notes: "",
      status: "",
    },
  });

  const submitHandler = async (formValues: JobFormValues) => {
    const formData = new FormData();
    formData.append("id", String(selected.id));
    formData.append("company", formValues.company);
    formData.append("position", formValues.position);
    formData.append("salary", formValues.salary ?? "");
    formData.append("appliedDate", formValues.appliedDate);
    formData.append("notes", formValues.notes || "");
    formData.append("status", formValues.status);

    if (formValues.jobLink instanceof File) {
      formData.append("jobLink", formValues.jobLink);
    }

    console.log("form", formData);

    try {
      const res = await fetch(`/api/posts/${selected.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save");

      await mutate();
      setSnackOpen(true);
      reset();
      handleOnClose();
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    console.log("selected in update form:", selected);
    if (selected) {
      reset({
        company: selected.company || "",
        position: selected.position || "",
        salary: selected.salary || "",
        appliedDate: selected.appliedDate?.split("T")[0] || "",
        notes: selected.notes || "",
        status: selected.status || "",
        jobLink: null,
      });
    }
  }, [selected, reset]);

  const { data: status } = useSWR("/api/enum/status", () =>
    fetch("/api/enum/status").then((res) => res.json())
  );

  return (
    <>
      <FormDialog
        open={open}
        title="Update Job Application"
        handleOnClose={handleOnClose}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextInput name="company" control={control} label="Company" />
          <TextInput name="position" control={control} label="Position" />
          <TextInput name="salary" control={control} label="Salary" />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="status-label"
                  label="Status"
                  value={field.value || ""}
                >
                  {status &&
                    status.map((s: any) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>

          <TextInput name="notes" control={control} label="Location" />
          <TextInput
            name="appliedDate"
            control={control}
            label="Applied Date"
            type="date"
          />
          <TextInput
            name="jobLink"
            control={control}
            label="Resume"
            type="file"
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Update
          </Button>
        </form>
      </FormDialog>
    </>
  );
};

export default UpdateForm;
