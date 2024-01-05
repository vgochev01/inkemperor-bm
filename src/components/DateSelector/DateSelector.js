import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

const DateSelector = ({ selectedPeriod, setSelectedPeriod, setCustomPeriod, setDateForMonth, setDateForYear }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        if (period !== 'custom') {
            setCustomPeriod({ start: '', end: '' });
        } else {
            setCustomPeriod({ start: startDate.toISOString(), end: endDate.toISOString() });
        }
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            setCustomPeriod({ start: start.toISOString(), end: end.toISOString() });
        }
    };

    return (
        <div className="date-selector">
            <ButtonGroup className="mb-2">
                <Button variant={selectedPeriod === 'month' ? 'primary' : 'secondary'} onClick={() => handlePeriodChange('month')}>Month</Button>
                <Button variant={selectedPeriod === 'year' ? 'primary' : 'secondary'} onClick={() => handlePeriodChange('year')}>Year</Button>
                <Button variant={selectedPeriod === 'custom' ? 'primary' : 'secondary'} onClick={() => handlePeriodChange('custom')}>Custom</Button>
            </ButtonGroup>
            {selectedPeriod === 'custom' && (
                <Form>
                    <Form.Group controlId="dateRange">
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateChange}
                        />
                    </Form.Group>
                </Form>
            )}
            {selectedPeriod === 'month' && (
                <Form>
                    <Form.Group controlId="dateMonth">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setDateForMonth(date)}
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                        />
                    </Form.Group>
                </Form>
            )}
            {selectedPeriod === 'year' && (
                <Form>
                    <Form.Group controlId="dateYear">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setDateForYear(date)}
                            dateFormat="yyyy"
                            showYearPicker
                        />
                    </Form.Group>
                </Form>
            )}
        </div>
    );
};

export default DateSelector;
