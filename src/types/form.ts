import { ReactNode } from "react";

export type FormDialogType = {
    open: boolean;
    children?: ReactNode;
    title?: string;
    handleOnClose:()=>void
}