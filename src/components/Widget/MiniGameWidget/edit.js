import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createMiniGameWidgetAction } from '../../../redux/slices/mentor';

export const MINI_GAMES = [
  {
    label: 'بازی زندگی کانوی',
    url: 'https://mini-games-sigma.vercel.app/Conways_Game_Of_Life'
  },
  {
    label: 'شبیه‌ساز بازی زندگی',
    url: 'https://mini-games-sigma.vercel.app/Game_Of_Life_Simulation'
  },
  {
    label: 'رفتار جمعی ماهی‌ها',
    url: 'https://mini-games-sigma.vercel.app/Collective_Behavior_Of_Fish'
  },
  {
    label: 'بهینه‌سازی کلونی مورچه‌ها',
    url: 'https://mini-games-sigma.vercel.app/Ant_Colony_Optimization',
  },
  {
    label: 'واکسیناسیون شبکه',
    url: 'https://mini-games-sigma.vercel.app/Network_Vaccination',
  },
  {
    label: 'حساب به نقطه‌ها',
    url: 'https://mini-games-sigma.vercel.app/Account2Points'
  },
  {
    label: 'ترکیبیات ۱',
    url: 'https://mini-games-sigma.vercel.app/tarkibiat/1'
  },
  {
    label: 'ترکیبیات ۲',
    url: 'https://mini-games-sigma.vercel.app/tarkibiat/2'
  },
  {
    label: 'ترکیبیات ۳',
    url: 'https://mini-games-sigma.vercel.app/tarkibiat/3'
  },
  {
    label: 'نظریه بازی ۱',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/1'
  },
  {
    label: 'نظریه بازی۲',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/2'
  },
  {
    label: 'نظریه بازی ۳',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/3'
  },
  {
    label: 'نظریه بازی ۴',
    url: 'https://mini-games-sigma.vercel.app/Donor_Patient/4'
  },
  {
    label: 'اتوماتا',
    url: 'https://mini-games-sigma.vercel.app/Defusing_Bomb'
  },
]

function MiniGameEditWidget({
  open,
  handleClose,
  initLink = '',
  stateId,
  id,
  createMiniGameWidget,
}) {
  const [link, setLink] = useState(initLink);
  const t = useTranslate();

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createMiniGameWidget({ state: stateId, link });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('game')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('chooseTheGame')}</DialogContentText>
        <TextField
          autoFocus
          fullWidth
          select
          label={t('game')}
          value={link}
          inputProps={{ className: 'ltr-input' }}
          onChange={(e) => setLink(e.target.value)}>
          {MINI_GAMES.map((miniGame, index) => (
            <MenuItem key={index} value={miniGame.url}>
              {miniGame.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {
  createMiniGameWidget: createMiniGameWidgetAction,
})(MiniGameEditWidget);
