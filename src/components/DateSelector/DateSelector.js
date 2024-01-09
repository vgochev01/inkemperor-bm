import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

const DateSelector = ({ selectedPeriod, setSelectedPeriod, setCustomPeriod, handleDateForMonth, handleDateForYear }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const updateCustomPeriod = (start, end) => {
        // Set start to the beginning of the day
        const adjustedStart = new Date(start.setHours(0, 0, 0, 0));

        // Set end to the end of the day, or the same as start if it's the same day
        const adjustedEnd = new Date(
            end.getFullYear(), end.getMonth(), end.getDate(),
            23, 59, 59, 999
        );

        setCustomPeriod({
            start: adjustedStart.toISOString(),
            end: adjustedEnd.toISOString(),
            year: adjustedStart.getFullYear(),
            month: adjustedStart.getMonth() + 1 // JavaScript months are 0-indexed
        });
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);

        if (period === 'month') {
            const startOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            updateCustomPeriod(startOfMonth, endOfMonth);
        } else if (period === 'year') {
            const startOfYear = new Date(startDate.getFullYear(), 0, 1);
            const endOfYear = new Date(startDate.getFullYear(), 11, 31);
            updateCustomPeriod(startOfYear, endOfYear);
        } else if (period === 'custom') {
            const today = new Date();
            setStartDate(today);
            setEndDate(today);
            updateCustomPeriod(today, today);
        }
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            updateCustomPeriod(start, end);
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
                            dateFormat="yyyy/MM/dd"
                        />
                    </Form.Group>
                </Form>
            )}
            {selectedPeriod === 'month' && (
                <Form>
                    <Form.Group controlId="dateMonth">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                handleDateForMonth(date);
                            }}
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
                            onChange={(date) => {
                                setStartDate(date);
                                handleDateForYear(date);
                            }}
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
