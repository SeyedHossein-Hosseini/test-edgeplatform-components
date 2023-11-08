// import { useEffect, useState } from 'react';
// import { Box, Tabs, Tab, Button } from '@material-ui/core';
// import { useStyle } from 'src/pages/dashboard/add-user/add-user.style';
// import momentUtils from '@date-io/moment';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import PersonalInformationForm from './add-user-personal-information';
// import FaceAuthorizationForm from './add-user-face-authorization';
// import EntranceHistoryProfile from './add-user-entrance-history';
// import { NavLink, useHistory, useParams } from 'react-router-dom';
// import { ArrowBackIos, Face, Person, TransferWithinAStation } from '@material-ui/icons';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppState } from 'src/redux/store';
// import moment from 'moment';
// import { default as jMoment } from 'jalali-moment';
// import 'moment/locale/fa.js';

// const AddUser = () => {
// const classes = useStyle();
//   const history = useHistory();
// const { t } = useTranslation();
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const dispatch = useDispatch();
//   const { id } = useParams<{ id: string }>();
// const { direction, locale } = useSelector((state: AppState) => state.AppSetting);
//   const [ value, setValue ] = useState(parseInt(params.get('tab')) || 0);
// const [ employeeID, setEmployeeID ] = useState<string>(id);

// useEffect( () => {
//   moment().locale( locale );
//   history.push({ search: `tab=${value.toString()}` });
// }, []);

// useEffect(() => {
//   moment().locale(locale);
// }, [locale]);

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue);
//     history.push({ search: `tab=${newValue.toString()}` });
//   };

//   const handlePersonalFormSubmit = (response: any) => {
//     setTimeout(() => {
//       history.push({
//         pathname: `/${locale}/user/${response['id']}`,
//         search: '?tab=1',
//       });
//     }, 2000);
//   };

//   return (
//     <MuiPickersUtilsProvider libInstance={jMoment} utils={momentUtils} locale={locale}>
//       <Box className={classes.TabsWrapper}>
//         <Tabs
//           orientation="vertical"
//           variant="scrollable"
//           color="default"
//           value={value}
//           onChange={handleChange}
//           className={classes.tabsBar}
//           aria-label="Vertical tabs example"
//         >
//           <Tab label={ t('addUsers.firstTab') } icon={<Person />} />
//           {(employeeID !== undefined) && <Tab label={ t('addUsers.secondTab') } icon={<Face />} /> }
//           {(employeeID !== undefined) && <Tab label={ t('addUsers.userHistory') } icon={<TransferWithinAStation />} /> }
//         </Tabs>
//         <Box className={classes.TabsItemWrapper} hidden={value !== 0} role="tabpanel">
//           <PersonalInformationForm employeeID={employeeID} onFormSubmitted={handlePersonalFormSubmit}/>
//         </Box>
//         {(employeeID !== undefined && value === 1 ) &&
//           <Box className={classes.TabsItemWrapper} hidden={value !== 1} role="tabpanel">
//             <FaceAuthorizationForm employeeID={employeeID}/>
//           </Box>
//         }
//         {(employeeID !== undefined && value === 2 ) &&
//           <Box className={classes.TabsItemWrapper} hidden={value !== 2} role="tabpanel">
//             <EntranceHistoryProfile employeeID={employeeID}/>
//           </Box>
//         }
//       </Box>
//       <div className={classes.footer}>
//         <NavLink to={`/${locale}/users`} >
//           <Button size="large" startIcon={<ArrowBackIos />} >{ t('addUsers.backBtn') }</Button>
//         </NavLink>
//       </div>
//     </MuiPickersUtilsProvider>
//   );
// };

// export default AddUser;

import { useState, useEffect, Fragment, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import moment from 'moment';
import { useStyle } from 'src/pages/dashboard/add-user/add-user.style';
import { useTranslation } from 'react-i18next';
import 'moment/locale/fa.js';
import momentUtils from '@date-io/moment';
import { default as jMoment } from 'jalali-moment';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonalInformationForm from './add-user-personal-information';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import FaceAuthorizationForm from './add-user-face-authorization';
import EntranceHistoryProfile from './add-user-entrance-history';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const EnrollUserStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { id } = useParams<{ id: string }>();
  const [employeeID, setEmployeeID] = useState<string>(id);
  const classes = useStyle();
  const history = useHistory();
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);



  const handleNext = () => {
    let newSkipped = skipped;


    // using this arrow function, gives you the old value of the page
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePersonalFormSubmit = (response: any) => {
    console.log("submit")
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ padding: '10px' }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps} sx={{ padding: '10px' }}>
              <StepLabel sx={{ padding: '10px' }}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <MuiPickersUtilsProvider libInstance={jMoment} utils={momentUtils} locale={locale}>
          <Box>
            <Typography>{steps[activeStep]}</Typography>
          </Box>
          <Fragment>
            <Box className={classes.TabsItemWrapper} hidden={activeStep !== 0} role="tabpanel">
              <PersonalInformationForm employeeID={employeeID} onFormSubmitted={handlePersonalFormSubmit} />
            </Box>
            <Box className={classes.TabsItemWrapper} hidden={activeStep !== 1} role="tabpanel">
              <FaceAuthorizationForm employeeID={employeeID} />
            </Box>
            <Box className={classes.TabsItemWrapper} hidden={activeStep !== 2} role="tabpanel">
              <EntranceHistoryProfile employeeID={employeeID} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Fragment>
        </MuiPickersUtilsProvider>
      )}
    </Box>
  );
}

export default EnrollUserStepper;