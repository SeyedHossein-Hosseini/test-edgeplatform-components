import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TakeWebcamImage from './takeWebcamImage'
import UploadImage from './uploadImage';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import WebcamModal from './WebcamModal'


export default function Form1() {
    // 0 for none of the photo taking or photo uplaoding
    const [getImageStatus, setGetImageStatus] = useState("")

    const [userImg, setUserImg] = useState("")

    const declareUploadOrTakePhoto = (stat: string) => {
        setGetImageStatus(stat);
    }

    const onSetImageSrc = (imageSrc: any) => {
        setUserImg(imageSrc)
    }

    return (
        <>

            <img src={userImg} alt="" width="100px" />

            <Grid item xs={12}>
                <Button onClick={() => declareUploadOrTakePhoto("take")}>Take photo</Button>
                <Button onClick={() => declareUploadOrTakePhoto("upload")}>Upload photo</Button>
            </Grid>
            {
                getImageStatus === "take" ? (<WebcamModal setImageSrc={onSetImageSrc} />) : (<UploadImage />)

            }
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid >
        </>
    );
}