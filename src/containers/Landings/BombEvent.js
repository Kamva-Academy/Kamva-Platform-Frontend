import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { DriveEtaOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  backgroundVideo: {
    position: 'fixed',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100vh',
  },
  section1: {
    height: '100vh',
    color: 'black',
    position: 'relative',
  },
}));


const BombEvent = () => {
  const classes = useStyles();
  const videoRef = useRef();


  setInterval(() => {
    console.log(window.pageYOffset)
    videoRef.current.currentTime = window.pageYOffset / 100;
  }, 100)

  useEffect(() => {

  }, [window.pageYOffset])


  return (
    <div style={{ height: '1500vh' }}>
      <video ref={videoRef} id="v0" preload className={classes.backgroundVideo} playsInline muted loop >
        <source src="https://uupload.ir/filelink/aEha19Gn0X8W/00ls_finalclip_trim.mp4" type="video/mp4" />
      </video>


    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({

})

export default connect(
  mapStateToProps,
  {

  }
)(BombEvent);