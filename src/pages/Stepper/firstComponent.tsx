import React, { useState } from 'react'
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import { Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function firstComponent(props: any) {
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")



    const url = "http://localhost:9000/test";

    const handleChange = (e: any) => {
        setEmail(e.target.value)
    }

    const handleAlert = (statusCode: number) => {
        if (statusCode !== 201)
            setAlertShown(true)
    }


    const submitInfo = () => {
        setLoading(true)
        axios.post(url, { email }, { timeout: 3000 }).then((response) => {
            console.log(response.status);
            console.log(response.data.response);
            props.firstSetStatus(response.status);
            handleAlert(response.status);
            setAlertMessage(response.data.response);
            setResponse(response.data.response);
            setLoading(false)
        }).catch((err) => {
            setLoading(false);
            handleAlert(500);
            setAlertMessage(err.message);
            console.log(err.message);
        })
    }
    return (
        <>
            <form action="">
                <input type="email" id='email' onChange={handleChange} value={email} placeholder='Enter your email' />
                <Button variant="contained" onClick={submitInfo}>Submit</Button>
            </form>

            <div>

                {
                    alertShown && (
                        <Box>
                            <Alert
                                variant="filled"
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setAlertShown(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {alertMessage}
                            </Alert>
                        </Box>

                    )
                }

                {
                    loading && <p>Loading ...</p>
                }
            </div>


        </>
    )
}

