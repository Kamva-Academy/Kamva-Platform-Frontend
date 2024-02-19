import React from "react";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TelegramSVG from 'components/atoms/socialMediaSVGs/TelegramSVG';
import SvgIcon from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import EitaaSVG from "components/atoms/socialMediaSVGs/EitaaSVG";
import BaleSVG from "components/atoms/socialMediaSVGs/BaleSVG";
import ShadSVG from "components/atoms/socialMediaSVGs/ShadSVG";
import InstagramSVG from "components/atoms/socialMediaSVGs/InstagramSVG";
import { toPersianNumber } from "utils/translateNumber";

type ProgramContactInfoType = any;

type ProgramContactInfoPropsType = {
  programContactInfo: ProgramContactInfoType
}

const ProgramContactInfo: FC<ProgramContactInfoPropsType> = ({
  programContactInfo,
}) => {

  if (!programContactInfo) {
    return null;
  }

  const sociaMedias = [
    {
      icon: EitaaSVG,
      href: programContactInfo.eitaa_link,
    },
    {
      icon: BaleSVG,
      href: programContactInfo.bale_link,
    },
    {
      icon: TelegramSVG,
      href: programContactInfo.telegram_link,
    },
    {
      icon: ShadSVG,
      href: programContactInfo.shad_link,
    },
    {
      icon: InstagramSVG,
      href: programContactInfo.instagram_link,
    },
  ]

  return (
    <Stack alignItems={'center'} spacing={3}>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-evenly'} alignContent={'space-between'}>
        {sociaMedias.filter(socialMedia => socialMedia.href).map((socialMedia, index) =>
          <IconButton key={index} href={socialMedia.href} sx={{
            padding: 0,
            transition: 'transform 0.1s ease-in-out',
            ":hover": {
              transform: 'translateY(-0.1rem) scale(1.05)',
            }
          }}>
            <SvgIcon sx={{ fontSize: 30 }}>
              {socialMedia.icon}
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      {programContactInfo.phone_number &&
        <Typography fontSize={15} textAlign={'center'}>
          {'شماره پشتیبانی:'}
          <Typography fontSize={20}>
            {toPersianNumber(programContactInfo.phone_number)}
          </Typography>
        </Typography>
      }
    </Stack>
  )
}

export default ProgramContactInfo;