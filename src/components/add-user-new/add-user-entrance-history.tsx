import {
  Box, Grid, Paper, Typography,
} from '@material-ui/core';
import { Today } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';
import { useStyle } from 'src/pages/dashboard/add-user/add-user.style';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { detectedFacesLogsData } from 'src/services/api/logs.api';

export interface EntranceHistoryProfileProps {
  employeeID?: string,
}

const EntranceHistoryProfile: React.FC<EntranceHistoryProfileProps> = (props: EntranceHistoryProfileProps) => {
  const datePipe = new DatePipe();
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyle();
  const dispatch = useDispatch();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);
  const PersianFormat = 'DD MMM YYYY hh:mm:ss';
  const EnglishFormat = 'DD MMM YYYY hh:mm:ss';

  const [records, setRecords] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(100);

  // Filters
  const [page, setPage] = useState<number>(parseInt('' + params.get('page')) || 1);
  const [perPage, setPerPage] = useState(8);

  const handleChange = (e: any, pageNumber: number) => {
    paginate(pageNumber);
  };

  const paginate = (n: number) => {
    setPage(n);
    history.push({
      pathname: `/${locale}/user/${props.employeeID}`,
      search: '?tab=2&page=' + n,
    });
  };

  useEffect(() => {
    if (props.employeeID == undefined) return;
  }, []);

  useEffect(() => {
    setLoading((prevState: boolean) => true);
    const queryParams: any = {
      size: perPage,
      page: page,
      user_id: props.employeeID,
    };
    detectedFacesLogsData(queryParams).subscribe((res: any) => {
      setLoading((prevState: boolean) => false);
      setCount((prevState: number) => {
        const recordsLength: number = (res.count !== undefined) ? Math.ceil(res.count / perPage) : 100;
        return recordsLength;
      });
      setRecords(res['results']);
    });
  }, [page, props.employeeID]);

  return (
    <Paper className={classes.contentWrapper} square={false}>
      {loading ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IllustrationViewer isLoading={true} title={t('personnel.loading')} hasGradient={false} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {records.length > 0 && records.map((user, index) =>
            <Grid item xs={12} lg={12} key={index} className={classes.entranceHistoryGrid}>
              <Box className={classes.entranceHistoryWrapper}>
                <Typography variant='h5' component='p'>
                  {t('addUsers.spotted')} <strong> {user['stream_id']} </strong>
                </Typography>
                <Typography variant='subtitle1' component='p' className={classes.entranceHistoryTime}>
                  <Today />
                  {datePipe.dateConvertor(user['modified_at'], (locale === 'fa') ? PersianFormat : EnglishFormat, locale)}
                </Typography>
              </Box>
            </Grid>
          )}
          {records.length > 0 && <Pagination
            color='primary'
            showFirstButton
            showLastButton
            count={count}
            page={page}
            onChange={handleChange}
            className={classes.pagination}
          />}
        </Grid>
      )}
      {records.length === 0 && !loading &&
        <IllustrationViewer illustration={'emptyBox.svg'} title={t('personnel.noDataTitle')} hasGradient={false} />
      }
    </Paper>
  );
};

export default EntranceHistoryProfile;
