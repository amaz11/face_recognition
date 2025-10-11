import { Backdrop, Box } from "@mui/material";

const Loader = ({ open = true }) => {
  return (
    <Backdrop
      open={open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <Box
        sx={{
          height: "30px",
          aspectRatio: "2.5",
          "--_g": "no-repeat radial-gradient(farthest-side, #fff 90%, #0000)",
          background: "var(--_g), var(--_g), var(--_g), var(--_g)",
          backgroundSize: "20% 50%",
          animation: "l44 1s infinite linear alternate",
          "@keyframes l44": {
            "0%, 5%": {
              backgroundPosition: `calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%`,
            },
            "12.5%": {
              backgroundPosition: `calc(0*100%/3) 0, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%`,
            },
            "25%": {
              backgroundPosition: `calc(0*100%/3) 0, calc(1*100%/3) 0, calc(2*100%/3) 50%, calc(3*100%/3) 50%`,
            },
            "37.5%": {
              backgroundPosition: `calc(0*100%/3) 100%, calc(1*100%/3) 0, calc(2*100%/3) 0, calc(3*100%/3) 50%`,
            },
            "50%": {
              backgroundPosition: `calc(0*100%/3) 100%, calc(1*100%/3) 100%, calc(2*100%/3) 0, calc(3*100%/3) 0`,
            },
            "62.5%": {
              backgroundPosition: `calc(0*100%/3) 50%, calc(1*100%/3) 100%, calc(2*100%/3) 100%, calc(3*100%/3) 0`,
            },
            "75%": {
              backgroundPosition: `calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 100%, calc(3*100%/3) 100%`,
            },
            "87.5%": {
              backgroundPosition: `calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 100%`,
            },
            "95%, 100%": {
              backgroundPosition: `calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%`,
            },
          },
        }}
      />
    </Backdrop>
  );
};

export default Loader;
