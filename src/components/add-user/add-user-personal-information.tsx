import React, { useEffect, useState } from 'react';
import { useStyle } from 'src/pages/dashboard/add-user/add-user.style';
import { DatePicker } from '@material-ui/pickers';
import * as Yup from 'yup';
import { FormikValues, useFormik } from 'formik';
import moment from 'moment';
import { addNewEmployee, getEmployeeByID, updateEmployee } from 'src/services/api/personnel.api';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import clsx from 'clsx';
import actions from 'src/redux/appSetting/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isPermalink } from 'src/helpers/strings/strings';
import { useTranslation } from 'react-i18next';
import { AppState } from 'src/redux/store';
import 'moment/locale/fa.js';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';

export interface PersonalInformationFormProps {
  employeeID?: string,
  onFormSubmitted: (res: any) => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ( props: PersonalInformationFormProps ) => {
  const { t } = useTranslation();
  const classes = useStyle();
  const dispatch = useDispatch();
  const { locale } = useSelector((state: AppState) => state.AppSetting );
  const [ avatarPreview, setAvatarPreview ] = useState<any>('avatar-placeholder.jpg');
  const [ isWaiting, setIsWaiting ] = useState<boolean>(false);

  const Gender: Array<any> = [
    {
      value: 'M',
      name: 'Male',
    }, {
      value: 'F',
      name: 'Female',
    }, {
      value: 'N',
      name: 'Prefer not to say',
    },
  ];
  const Positions: Array<string> = [ 'Security', 'CEO', 'CTO', 'Other' ];

  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed().required('This Field is required'),
    first_name: Yup.string().required('This Field is required'),
    last_name: Yup.string().required('This Field is required'),
    identity_number: Yup.string().required('This Field is required'),
    national_number: Yup.string().required('This Field is required'),
    phone_number: Yup.string().required('This Field is required'),
    birthdate: Yup.string().required('This Field is required'),
    gender: Yup.string().required('This Field is required'),
    position: Yup.string().required('This Field is required'),
  });

  const createNewEmployee = ( values: FormikValues ) => {
    if ( isWaiting ) return;
    setIsWaiting( (prevState: boolean) => true );
    const formData: FormData = new FormData();
    values['birthdate'] = moment(values['birthdate']).format('YYYY-MM-DD');
    Object.keys( values ).map( (item: string, index: number) => {
      formData.append( item, values[item]);
    });
    addNewEmployee( formData ).subscribe({
      next: (res: any) => {
        dispatch(
            actions.setToast({
              message: 'The User Created Successfully!',
              severity: 'success',
              horizontal: 'center',
              vertical: 'bottom',
              autoHideDuration: 2000,
            })
        );
        props.onFormSubmitted(res);
      },
      error: ( error ) => {
        setIsWaiting( (prevState: boolean) => false );
        dispatch(
            actions.setToast({
              message: 'Something Went Wrong!',
              severity: 'error',
              horizontal: 'center',
              vertical: 'bottom',
              autoHideDuration: 2000,
            })
        );
      },
      complete: () => setIsWaiting( (prevState: boolean) => false ),
    });
  };

  const UpdateCurrentEmployee = ( values: FormikValues ) => {
    const finalFormValues = { ...values };
    const formData: FormData = new FormData();
    finalFormValues['avatar'] = ( isPermalink( finalFormValues['avatar'] ) ) ? undefined : values['avatar'];
    finalFormValues['birthdate'] = moment(finalFormValues['birthdate']).format('YYYY-MM-DD');
    Object.keys( finalFormValues ).map( (item: string, index: number) => {
      if ( finalFormValues[item] !== undefined ) {
        formData.append(item, finalFormValues[item]);
      }
    });
    updateEmployee( props.employeeID, formData ).subscribe({
      next: (res: any) => {
        dispatch(
            actions.setToast({
              message: 'Updates Successfully!',
              severity: 'success',
              horizontal: 'center',
              vertical: 'bottom',
              autoHideDuration: 2000,
            })
        );
      },
      error: (err: any) => {
        // ToDo: Get Message From Response
        dispatch(
            actions.setToast({
              message: 'Something Went Wrong!',
              severity: 'error',
              horizontal: 'center',
              vertical: 'bottom',
              autoHideDuration: 2000,
            })
        );
      },
    });
  };

  const formSubmitHandler = ( values: FormikValues ) => {
    ( props.employeeID == undefined ) ? createNewEmployee( values ) : UpdateCurrentEmployee( values );
  };

  const formik = useFormik({
    initialValues: {
      avatar: null,
      first_name: '',
      last_name: '',
      identity_number: '',
      phone_number: '',
      national_number: '',
      gender: '',
      position: '',
      birthdate: moment(),
    },
    validationSchema: validationSchema,
    onSubmit: formSubmitHandler,
  });

  const handleAvatar = (event: any) => {
    const reader = new FileReader();
    if ( event.target.files && event.target.files.length > 0 ) {
      formik.setFieldValue('avatar', event.target.files[0]);
      reader.readAsDataURL( event.target.files[0] );
      reader.onload = () => {
        setAvatarPreview( (prevState: any) => reader.result );
      };
    }
  };

  const numeralInputCheck = ( value: any, formFieldName: string, regEx: RegExp ) => {
    let TempValue = value.target.value.substring(0, (value.target.value.length - 1) );
    if ( regEx.test( digitsFaToEn(value.target.value.slice(-1)) ) ) {
      TempValue = TempValue + digitsFaToEn( value.target.value.slice(-1) );
    }
    formik.setFieldValue(formFieldName, TempValue);
  };

  const alphabetInputCheck = ( value: any, formFieldName: string, regEx: RegExp ) => {
    let TempValue = value.target.value.substring(0, (value.target.value.length - 1) );
    if ( regEx.test( digitsFaToEn(value.target.value.slice(-1)) ) ) {
      TempValue = TempValue + value.target.value.slice(-1);
    }
    formik.setFieldValue(formFieldName, TempValue);
  };

  useEffect( () => {
    if ( props.employeeID == undefined ) return;
    getEmployeeByID( props.employeeID ).subscribe({
      next: (res: any) => {
        setAvatarPreview( res['avatar'] );
        Object.keys(res).forEach( (field: any) => {
          formik.setFieldValue(field, res[field]);
        });
      },
    });
  }, []);

  useEffect( () => {
    moment().locale( locale );
  }, [locale]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper className={classes.contentWrapper} square={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={clsx([ classes.avatarField, {
              [classes.avatarFieldError]: formik.touched.avatar && Boolean(formik.errors.avatar),
            }]) }>
              <input name='avatar' type='file' onChange={handleAvatar} />
              <img src={avatarPreview} alt='Avatar' />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <TextField
                fullWidth
                name="first_name"
                label={ t('addUsers.firstNameLbl') }
                variant="outlined"
                value={formik.values.first_name}
                onChange={ (value) => alphabetInputCheck(value, 'first_name', /^\D+$/) }
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <TextField
                fullWidth
                name="last_name"
                label={ t('addUsers.lastNameLbl') }
                variant="outlined"
                value={formik.values.last_name}
                onChange={ (value) => alphabetInputCheck(value, 'last_name', /^\D+$/) }
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <TextField
                fullWidth
                name="national_number"
                label={ t('addUsers.nationalNumberLbl') }
                variant="outlined"
                value={formik.values.national_number}
                onChange={ (value) => numeralInputCheck( value, 'national_number', /^\d+$/)}
                error={formik.touched.national_number && Boolean(formik.errors.national_number)}
                helperText={formik.touched.national_number && formik.errors.national_number}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel error={formik.touched.gender && Boolean(formik.errors.gender)}>{ t('addUsers.genderLbl') }</InputLabel>
              <Select
                fullWidth
                name="gender"
                label={ t('addUsers.genderLbl') }
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                {Gender.map((item) => (
                  <MenuItem key={item['value']} value={item['value']}>{item['name']}</MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={formik.touched.gender && Boolean(formik.errors.gender)}>
                { formik.touched.gender && formik.errors.gender }
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <TextField
                fullWidth
                name="identity_number"
                label={ t('addUsers.personnelIdLbl') }
                variant="outlined"
                value={formik.values.identity_number}
                onChange={ (value) => numeralInputCheck(value, 'identity_number', /^\d+$/) }
                error={formik.touched.identity_number && Boolean(formik.errors.identity_number)}
                helperText={formik.touched.identity_number && formik.errors.identity_number}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <TextField
                fullWidth
                name="phone_number"
                label={ t('addUsers.phoneNumberLbl') }
                variant="outlined"
                value={formik.values.phone_number}
                onChange={ (value) => numeralInputCheck(value, 'phone_number', /^\d+$/) }
                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                helperText={formik.touched.phone_number && formik.errors.phone_number}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <DatePicker
                fullWidth
                name="birthdate"
                label={ t('addUsers.birthdateLbl') }
                variant="inline"
                inputVariant="outlined"
                format="MM/dddd/yyyy"
                value={formik.values.birthdate}
                onChange={ (value) => formik.setFieldValue('birthdate', value)}
                error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                helperText={formik.touched.birthdate && formik.errors.birthdate}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <InputLabel error={formik.touched.position && Boolean(formik.errors.position)}>{ t('addUsers.positionLbl') }</InputLabel>
              <Select
                fullWidth
                name="position"
                label={ t('addUsers.positionLbl') }
                value={formik.values.position}
                onChange={formik.handleChange}
                error={formik.touched.position && Boolean(formik.errors.position)}
              >
                {Positions.map((name) => (
                  <MenuItem key={name} value={name.toLowerCase()}>{name}</MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={formik.touched.position && Boolean(formik.errors.position)}>
                { formik.touched.position && formik.errors.position }
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Box className={classes.FormFooter}>
          <div className={classes.SubmitBtnWrapper}>
            <Button color="primary" variant="contained" type="submit" size="large" disabled={isWaiting || !formik.dirty}>
              { t('addUsers.BasicInfoBtn') }
            </Button>
            { isWaiting && <CircularProgress size={24} className={classes.buttonProgress}/>}
          </div>
        </Box>
      </Paper>
    </form>
  );
};

export default PersonalInformationForm;
