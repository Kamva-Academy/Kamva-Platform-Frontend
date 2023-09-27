import React from "react";
import { Stack, Typography } from "@mui/material";

const Brand = () => {
  return (
    <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} paddingRight={1}>
      <img alt="kamva-logo" src={process.env.PUBLIC_URL + '/logo.png'} width={50} />
      <Typography fontFamily={"Lalezar"} sx={{ color: "#3498DB", fontSize: { xs: 36, md: 40 }, fontWeight: 500 }}>کاموا</Typography>
    </Stack>
  )
}

export default Brand;