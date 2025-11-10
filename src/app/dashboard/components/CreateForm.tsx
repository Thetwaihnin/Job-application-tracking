"use client";
import FormDialog from "@/components/FormDialog";
import TextInput from "@/components/TextField";
import { FormDialogType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";

const JobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  salary: z.string().optional(),
  appliedDate: z.string().min(1, "Applied date required"),
  jobLink: z.any().optional(),
  notes: z.string().optional(),
});

export type JobFormValues = z.infer<typeof JobSchema>;

const CreateForm = ({ open, handleOnClose }: FormDialogType) => {
  const { control, handleSubmit, reset } = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      company: "",
      position: "",
      salary: "",
      appliedDate: "",
      jobLink: null,
      notes: "",
    },
  });

  const submitHandler = async (formValues: JobFormValues) => {
    const formData = new FormData();

    // append normal fields
    formData.append("company", formValues.company);
    formData.append("position", formValues.position);
    formData.append("salary", formValues.salary ?? "");
    formData.append("appliedDate", formValues.appliedDate);
    formData.append("notes", formValues.notes || "");

    if (formValues.jobLink instanceof File) {
      formData.append("jobLink", formValues.jobLink);
    }

    console.log(formValues);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save");

      console.log("Success");
      reset();
      handleOnClose();
    } catch (error) {
      console.error('error:',error);
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        title="Create Job Application"
        handleOnClose={handleOnClose}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextInput name="company" control={control} label="Company" />
          <TextInput name="position" control={control} label="Position" />
          <TextInput name="salary" control={control} label="Salary" />
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
            Save
          </Button>
        </form>
      </FormDialog>
    </>
  );
};

export default CreateForm;
