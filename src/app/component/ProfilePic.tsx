import { Box } from '@mui/material';
import Image from 'next/image'

export default function ProfilePic() {
  return (
    <Box
      component="div"
      sx={{
        width: 150,
        height: 150,
        borderRadius: "20%",
        overflow: "hidden",
        border: "2px solid black",
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)',
        marginTop: 8,
        marginLeft: 4
      }}
    >
      <Image
        src="/profile/greenYuri.jpg"
        // src="/Halloween.jpg"
        alt="Profile Picture"
        width={150}
        height={150}
        priority={true}
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
}

