import {
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import React, { useState, FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RegisterOneUserDialog from 'components/organisms/dialogs/RegisterOneUserDialog';

type AddOneUserPropsType = {}

const RegisterOneUser: FC<AddOneUserPropsType> = ({ }) => {
  const [open, setOpen] = useState(false);
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Typography variant='h4' component='h2'>
        {'افزودن کاربر جدید'}
      </Typography>
      <IconButton onClick={() => setOpen(open => !open)}>
        <AddCircleOutlineIcon />
      </IconButton>
      <RegisterOneUserDialog open={open} handleClose={() => setOpen(open => !open)} />
    </Stack>
  );
}

export default RegisterOneUser;
