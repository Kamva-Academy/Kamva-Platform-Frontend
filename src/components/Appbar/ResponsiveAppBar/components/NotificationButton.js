import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Badge,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
} from '@material-ui/icons';
import dateFormatter from '../../../../utils/dateFormatter';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  badge: {
    '& .MuiBadge-badge': {
      background: theme.palette.error.main,
      color: 'white',
    },
  },
  notificationList: {
    minWidth: 300,
    maxHeight: 400,
    overflowY: 'auto',
  },
  notification: {
    padding: theme.spacing(2, 1),
    borderBottom: '1px solid #faa',
    borderLeft: '6px solid red',
    background: '#f9f4f4',
  },
  seen: {
    borderBottom: '1px solid #ccc',
    borderLeft: '1px solid #ccc',
    background: '#fff',
  },
}));

const NotificationButton = ({ notifications }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handlePopoverOpen}>
        <Badge badgeContent={1} className={classes.badge}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.popover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        marginThreshold={30}>
        <Paper className={classes.notificationList}>
          <MenuList>
            {notifications
              .sort((a, b) => b.time - a.time)
              .map((notification) => (
                <MenuItem
                  className={clsx(
                    classes.notification,
                    notification.seen && classes.seen
                  )}>
                  <Grid container justify="flex-start" spacing={1}>
                    <Grid item>
                      <div style={{ textAlign: 'center' }}>
                        <div>
                          <AccountCircleIcon />
                        </div>
                        <Typography component="small" variant="body2">
                          پشتیبانی
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography component="small" variant="body2">
                        {dateFormatter({
                          date: notification.time,
                          format: 'hh:mm:ss',
                        })}
                      </Typography>
                      <Typography component="p" variant="subtitle2">
                        {notification.message}
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>
      </Popover>
      <></>
    </>
  );
};

const mapStateToProps = (state) => ({
  notifications: [
    {
      time: Date.now(),
      message: 'خیلی خوش اومدید!',
      seen: true,
    },
  ],
});

export default connect(mapStateToProps)(NotificationButton);
