import { Box } from '@mui/material';
import Image from 'next/image'

export default function ProfilePic() {
  return (
    <Box
      component="div"
      sx={{
        width: 200,
        height: 200,
        borderRadius: "100%",
        overflow: "hidden",
        border: "2px solid black",
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
        marginX: "auto",
        marginTop: 2
      }}
    >
      <Image
        src="/profile/greenYuri.jpg"
        alt="Profile Picture"
        width={200}
        height={200}
        priority={true}
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
