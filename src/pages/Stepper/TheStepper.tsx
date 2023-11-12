import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FirstComponent from './firstComponent';
import SecondComponent from './secondComponent';
import ThirdComponent from './thirdComponent';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';



const steps = ['first component', 'Second component', 'Third component'];

export default function TheStepper() {

    const [activeStep, setActiveStep] = React.useState(0);

    const [firstStatus, setFirstStatus] = React.useState(0)

    const [alertStatus, setAlertStatus] = React.useState("");

    React.useEffect(() => {
        console.log("first status changed");
        handleNext()
    }, [firstStatus])

    const handleNext = () => {
        if (firstStatus === 201) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setAlertStatus("alert is shown")
            console.log("first status is not 201");
            return;
        }
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>


                    <Box hidden={activeStep !== 0} role="tabpanel">
                        <FirstComponent firstSetStatus={setFirstStatus} />
                    </Box>
                    <Box hidden={activeStep !== 1} role="tabpanel">
                        <SecondComponent />
                    </Box>
                    <Box hidden={activeStep !== 2} role="tabpanel">
                        <ThirdComponent />
                    </Box>

                </React.Fragment>
            )}
        </Box>
    )
}


