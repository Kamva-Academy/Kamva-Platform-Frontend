import React, { useState } from 'react';
import { Button, ClickAwayListener, Grow, Popper } from '@material-ui/core';

export default function CustomSelect({ ContentComponent, title }) {
  const [btnEl, setBtnEl] = useState(null);

  const handleMenuClose = () => setBtnEl(null);

  const handleMenuOpen = (event) => setBtnEl(event.currentTarget);

  return (
    <>
      <Button variant="outlined" onClick={handleMenuOpen}>
        {title}
      </Button>
      <Popper
        open={!!btnEl}
        anchorEl={btnEl}
        role={undefined}
        style={{ zIndex: 10000 }}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <ClickAwayListener onClickAway={handleMenuClose}>
              <div>
                <ContentComponent />
              </div>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </>
  );
}
