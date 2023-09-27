import { Button, Icon, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardButton({ variant = 'text', name, to, onClick }) {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      onClick={() => {
        navigate(to);
        onClick?.();
      }}>
      <Typography fontSize={14} fontWeight={400}>{name}</Typography>
    </Button>
  );
}

export default DashboardButton;