import CardMedia from '@mui/material/CardMedia';
// import helpUserVideo from '../assets/video.mp4'
import { Grid } from '@material-ui/core';
import React from 'react';

export default function HelpUser() {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardMedia
          component="video"
          sx={{ width: '100%', maxWidth: '600px', m: 'auto' }}
          controls
          src="https://youtu.be/oUFJJNQGwhk"
        />
      </Grid>
    </Grid>
  );
}

