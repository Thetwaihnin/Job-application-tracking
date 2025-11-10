import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSession } from "next-auth/react";
import axios from "axios";
import useSWRMutation from "swr/mutation"
import { PostData } from "../Post";
import useSWR from "swr";

const ITEM_HEIGHT = 48;
const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

export default function LongMenu({ id }: { id: number }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data, mutate } = useSWR<PostData | undefined>(`/api/posts/${id}`, fetcher);

  const { trigger,isMutating } = useSWRMutation(
    "/api/posts", // endpoint (we will append id in trigger)
    async (url: string, { arg }: { arg: number }) => {
      await axios.delete(`${url}/${arg}`);
    }
  );
  const session = useSession();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("user data:", session.data?.user.name);
    console.log(data?.author?.name);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id: number) => {
    mutate(undefined, false);
    try {
      await trigger(id); // pass post id to trigger
      mutate(); // revalidate after server confirms
    } catch (err) {
      console.error(err);
      mutate(); // roll back on failure
    }
  };

  const deleting = isMutating;

  return (
    <div>
      <IconButton
        sx={{ color: "white" }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      {session.data?.user?.name === data?.author?.name ? (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                backgroundColor: "#1B3F3C",
                color: "white",
              },
            },
            list: {
              "aria-labelledby": "long-button",
            },
          }}
        >
          <MenuItem
            sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
            onClick={()=>handleDelete(id)}
          >
            <DeleteIcon sx={{ marginRight: 1 }} /> Delete
          </MenuItem>
          <MenuItem
            sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
          >
            <PushPinIcon sx={{ marginRight: 1 }} /> Pin
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                backgroundColor: "#1B3F3C",
                color: "white",
              },
            },
            list: {
              "aria-labelledby": "long-button",
            },
          }}
        >
          <MenuItem
            sx={{ fontFamily: "Playfair Display, serif", color: "white" }}
          >
            <VisibilityOffIcon sx={{ marginRight: 1 }} /> Hide Post
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
