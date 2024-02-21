import React from "react";
import { Stack, Typography } from "@mui/material";
import { useGetPartyQuery } from "redux/features/PartySlice";

const Brand = () => {

  const {
    data: party,
    isLoading,
  } = useGetPartyQuery();

  if (isLoading) return null;

  return (
    <Stack direction='row' alignItems={'center'} justifyContent={'center'} sx={{ userSelect: 'none' }} paddingRight={1}>
      <img alt="kamva-logo" src={party.logo.desktop_image} width={50} />
      <Typography fontFamily={"Lalezar"} sx={{ color: "#3498DB", fontSize: { xs: 36, md: 40 }, fontWeight: 500 }}>{party.local_name}</Typography>
    </Stack>
  )
}

export default Brand;