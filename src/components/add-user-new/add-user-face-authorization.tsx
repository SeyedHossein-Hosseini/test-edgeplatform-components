import React, { useCallback, useEffect, useState } from 'react';
import { useStyle } from 'src/pages/dashboard/add-user/add-user.style';
import { FormikValues, useFormik } from 'formik';
import { HumanReadablePipe } from 'src/pipes/human-readable/human-readable.pipe';
import { useDropzone } from 'react-dropzone';
import { Cached, CheckBox, CheckBoxOutlineBlank, Close, Delete, HourglassEmpty, MoreHoriz } from '@material-ui/icons';
import * as Yup from 'yup';
import clsx from 'clsx';
import { orange } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import actions from 'src/redux/appSetting/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getFaceCamerasList, getSingleFrameForFace } from 'src/services/api/service-config.api';
import { exportIpAddress } from 'src/helpers/strings/strings';
import { AppState } from 'src/redux/store';
import {
  addEmployeeFace,
  addEmployeeFaceByURL,
  getEmployeeDefinedFaces,
  removeEmployeeSingleDefinedFace,
} from 'src/services/api/personnel.api';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';

export interface FaceAuthorizationFormProps {
  employeeID?: string
}

const FaceAuthorizationForm: React.FC<FaceAuthorizationFormProps> = (props: FaceAuthorizationFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyle();
  const humanReadable = new HumanReadablePipe();
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  const [definedFaces, setDefinedFaces] = useState([]);
  const [faceRecFiles, setFaceRecFiles] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [cameraList, setCameraList] = useState([]);
  const [cameraFrames, setCameraFrames] = useState([]);
  const [selectedCameraFrames, setSelectedCameraFrames] = useState([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [imageOptions, setImageOptions] = React.useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isGetFrameDisabled, setIsGetFrameDisabled] = useState<boolean>(false);
  const onDrop = useCallback((acceptedFiles: any) => setFaceRecFiles([...faceRecFiles, ...acceptedFiles]), [faceRecFiles]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

  const validationSchema = Yup.object().shape({});

  const formSubmitHandler = (values: FormikValues) => {
    if (isWaiting) return;
    const formData: FormData = new FormData();
    setIsWaiting((prevState: boolean) => true);
    values['employee'] = props.employeeID;
    Object.keys(values).map((item: string, index: number) => {
      if (item === 'face_images') {
        values[item].forEach((file: any, fileIndex: number) => {
          formData.append(`${item}`, file);
        });
      } else {
        formData.append(item, values[item]);
      }
    });
    addEmployeeFace(formData).subscribe({
      next: (res: any) => {
        setFaceRecFiles([]);
        getEmployeeDefinedFacesQuery();
      },
      error: (error) => console.warn('error'),
      complete: () => setIsWaiting((prevState: boolean) => false),
    });
  };

  const removeItemFromUploadBox = (index: number) => {
    const updatedFaceRecFiles = [...faceRecFiles];
    updatedFaceRecFiles.splice(index, 1);
    setFaceRecFiles(updatedFaceRecFiles);
  };

  const getEmployeeDefinedFacesQuery = () => {
    getEmployeeDefinedFaces(props.employeeID).subscribe({
      next: (res: any) => {
        setDefinedFaces(res);
      },
    });
  };

  const removeSingleImageQuery = (event: any) => {
    removeEmployeeSingleDefinedFace(imageOptions['attributes']['data-faceid']['value']).subscribe({
      next: (res: any) => {
        setImageOptions(null);
        getEmployeeDefinedFacesQuery();
      },
      error: (err: Error) => {
        setImageOptions(null);
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

  const openCameraDialog = () => {
    setIsDialogOpen(true);
  };

  const getFrameFromCamera = () => {
    setIsGetFrameDisabled(true);
    getSingleFrameForFace({ stream_id: selectedCamera }).subscribe({
      next: (res: any) => {
        setIsGetFrameDisabled(false);
        if (!res['isOK']) {
          dispatch(
            actions.setToast({
              message: res['error'],
              severity: 'error',
              horizontal: 'center',
              vertical: 'bottom',
              autoHideDuration: 2000,
            })
          );
        } else {
          setCameraFrames((prevFrames) => prevFrames.concat(res['url']));
          setSelectedCameraFrames((prevState) => prevState.concat(res['url']));
        }
      },
      error: (err: Error) => {
        setIsGetFrameDisabled(false);
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

  const handleSelectFrames = (event: any) => {
    const isSelect: boolean = event.target.checked;
    const dataSrc: string = event.currentTarget['value'];
    const ItemIndex: number = selectedCameraFrames.indexOf(dataSrc);
    if (isSelect && ItemIndex === -1) {
      setSelectedCameraFrames((prevState) => [...prevState, dataSrc]);
    } else {
      const tempList = [...selectedCameraFrames];
      tempList.splice(ItemIndex, 1);
      setSelectedCameraFrames(tempList);
    }
  };

  const closeDialog = () => {
    setCameraFrames([]);
    setSelectedCameraFrames([]);
    setIsDialogOpen(false);
  };

  const registerSelectedFrame = () => {
    addEmployeeFaceByURL({ employee: props.employeeID, face_images: selectedCameraFrames }).subscribe({
      next: (res: any) => {
        getEmployeeDefinedFacesQuery();
        closeDialog();
      },
      error: (err: Error) => {
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

  const selectFrameByClickOnBox = (url: string) => {
    const ItemIndex: number = selectedCameraFrames.indexOf(url);
    if (ItemIndex === -1) {
      setSelectedCameraFrames((prevState) => [...prevState, url]);
    } else {
      const tempList = [...selectedCameraFrames];
      tempList.splice(ItemIndex, 1);
      setSelectedCameraFrames(tempList);
    }
  };

  const showSingleImage = () => {
    const item = definedFaces.find((obj: any) => obj['id'].toString() === imageOptions['attributes']['data-faceid']['value']);
    window.open('http://10.21.23.174:8000' + item['face_image'], '_blank', 'noopener,noreferrer,');
  };

  const faceFormik = useFormik({
    initialValues: {
      face_images: null,
    },
    validationSchema: validationSchema,
    onSubmit: formSubmitHandler,
  });

  useEffect(() => {
    if (props.employeeID == undefined) return;
    getEmployeeDefinedFacesQuery();
    getFaceCamerasList().subscribe({
      next: (cameras: any) => {
        setCameraList(cameras);
      },
      error: (err: Error) => setCameraList([]),
    });
  }, []);

  useEffect(() => {
    const formikValueField: Array<any> = [];
    Array.from(faceRecFiles).forEach((file: any, index: number) => formikValueField.push(file));
    faceFormik.setFieldValue('face_images', faceRecFiles);
  }, [faceRecFiles]);

  return (
    <>
      <Paper className={classes.contentWrapper}>
        {definedFaces.length > 0 &&
          <Box className={classes.TabsContentSection}>
            <Box className={classes.TabsContentHeader}>
              <Typography variant='h3' component="p" className={classes.TabsContentTitle}>{t('addUsers.definedFace')}</Typography>
              <IconButton onClick={getEmployeeDefinedFacesQuery}>
                <Cached fontSize="default" color="primary" />
              </IconButton>
            </Box>
            <Box className={classes.definedFacesList}>
              {
                definedFaces.map((face: any, index: number) => (
                  <Box className={classes.definedFacesItem} key={index}>
                    <img className={clsx([{
                      [classes.definedFacesItemFailed]: face['status'] === 'E',
                      [classes.definedFacesItemProcessing]: face['status'] === 'P',
                    }])} src={'http://10.21.23.174:8000' + face['face_image']} alt={`Image #${index + 1}`} />
                    {face['status'] !== 'S' &&
                      <span className={classes.definedFacesItemIcon}>
                        {face['status'] === 'P' && <HourglassEmpty style={{ color: orange['500'] }} />}
                        {face['status'] === 'E' && <Close color='error' />}
                      </span>
                    }
                    <IconButton
                      className={classes.ImageOptions}
                      size="medium"
                      data-faceid={face['id']}
                      onClick={(event) => setImageOptions(event.currentTarget)}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                ))
              }
            </Box>
            <Menu
              id="simple-menu"
              anchorEl={imageOptions}
              keepMounted
              open={Boolean(imageOptions)}
              onClose={() => setImageOptions(null)}
            >
              <MenuItem onClick={removeSingleImageQuery}>{t('addUsers.removeImage')}</MenuItem>
              <MenuItem onClick={showSingleImage}>{t('addUsers.openImage')}</MenuItem>
            </Menu>
          </Box>
        }
        <Box className={classes.TabsContentSection}>
          {definedFaces.length > 0 &&
            <Typography variant='h3' component="p" className={classes.TabsContentTitle}>{t('addUsers.addFace')}</Typography>
          }
          <form onSubmit={faceFormik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div {...getRootProps({ className: classes.dropzone })}>
                  <input {...getInputProps()} name='face_images' />
                  <p>Drag & drop some files here, or click to select files</p>
                </div>
                {faceRecFiles.length > 0 &&
                  <Box className={classes.selectedFileZone}>
                    <Typography variant="h4">Selected Files:</Typography>
                    <ul className={classes.selectedFile}>{
                      faceRecFiles.map((file: any, index: number) => (
                        <li key={index}>
                          <Box className={classes.selectedFileItem}>
                            <Typography component="h5">{file.path}</Typography>
                            <Typography component="span">{humanReadable.humanFileSize(file.size)}</Typography>
                            <IconButton
                              size="small"
                              color="secondary"
                              className={classes.selectedFileAction}
                              onClick={() => removeItemFromUploadBox(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </li>
                      ))
                    }</ul>
                  </Box>
                }
              </Grid>
            </Grid>
            <Box className={classes.FormFooter}>
              <div className={classes.SubmitBtnWrapper}>
                <Button color="primary" variant="contained" type="submit" size="large" disabled={isWaiting || faceRecFiles.length <= 0}>
                  {t('addUsers.uploadFaces')}
                </Button>
                {isWaiting && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              <Button color="primary" variant="outlined" type="button" size="large" onClick={openCameraDialog}>
                {t('addUsers.useCameraBtn')}
              </Button>
            </Box>
          </form>
        </Box>
        <Dialog fullWidth maxWidth={'md'} open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle className={classes.dialogHeader}>
            <Typography variant='h3' component='p'><strong>{t('addUsers.useCameraDialogTitle')}</strong></Typography>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Box className={classes.cameraListForm}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="selected_event">{t('getFrame.choose')}</InputLabel>
                    <Select
                      fullWidth
                      labelId="selected_event"
                      multiple={false}
                      value={selectedCamera}
                      label={t('getFrame.choose')}
                      onChange={(event: any, newValue: string | null) => setSelectedCamera(event.target.value)}
                    >
                      {cameraList.map((camera: any, index: number) => (
                        <MenuItem value={camera['id']} key={index}>{`${camera['id']} (${exportIpAddress(camera['uri'])})`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    color="primary"
                    size="large"
                    variant={'outlined'}
                    fullWidth
                    disabled={isGetFrameDisabled}
                    className={classes.cameraListFormBtn}
                    onClick={getFrameFromCamera}
                  >
                    {t('getFrame.submitBtn')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.cameraFrames}>
              {cameraFrames.length > 0 && cameraFrames.map((face: any, index: number) =>
                <Box className={classes.cameraFramesItem} key={index} onClick={() => selectFrameByClickOnBox(face)}>
                  <img src={face} alt={''} />
                  <Checkbox
                    className={classes.cameraFramesCheckbox}
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="small" />}
                    checked={selectedCameraFrames.indexOf(face) !== -1}
                    value={face}
                    onChange={handleSelectFrames}
                    name="checkedI"
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              disabled={selectedCameraFrames.length === 0}
              onClick={registerSelectedFrame}
            >
              {t('addUsers.uploadSelectedFrame')}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default FaceAuthorizationForm;
