import CardMedia from '@mui/material/CardMedia';
import helpUserVideo from '../../assets/video.mp4'
import { Container, Grid, Typography } from '@material-ui/core';

export default function HelpUser() {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CardMedia
                        component="video"
                        sx={{ width: '100%', maxWidth: '600px', m: 'auto' }}
                        controls
                        src={helpUserVideo}
                    />
                </Grid>
            </Grid>
        </>
    );
}
