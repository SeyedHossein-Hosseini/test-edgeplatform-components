import React, { useCallback, useEffect, useState } from 'react';
import { useStyle } from '../../components/add-user-new/add-user.style';
import { FormikValues, useFormik } from 'formik';
import { Cached, CheckBox, CheckBoxOutlineBlank, Close, Delete, HourglassEmpty, MoreHoriz } from '@material-ui/icons';
import * as Yup from 'yup';
import clsx from 'clsx';
import { orange } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';

import face from "../../assets/FaceRange.png"

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


export default function Form4() {
    const classes = useStyle();
    return (
        <>
            hello
        </>
    );
}
