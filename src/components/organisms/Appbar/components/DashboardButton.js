import { Button, Icon, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardButton({ name, to, onClick }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(to);
        onClick?.();
      }}>
      <Typography fontSize={14} fontWeight={400}>{name}</Typography>
    </Button>
  );
}

export default DashboardButton;