import { useState } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const MyDatePicker: React.FC = () => {
    const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

    const handleChange = (date: any) => {
        handleDateChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleChange}
                format="dd/MM/yyyy"
            />
        </MuiPickersUtilsProvider>
    );
};

export default MyDatePicker;
