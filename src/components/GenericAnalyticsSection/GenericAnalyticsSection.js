import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DataChart from '../DataChart/DataChart';
import DateSelector from '../DateSelector/DateSelector';
import { useAuth } from '../../context/AuthContext';

const GenericAnalyticsSection = ({ selectedCalendar, title, fetchFunction, chartLabel, dataType, yTitle }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [customPeriod, setCustomPeriod] = useState({
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    });
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const { accessToken } = useAuth();

    const generateChartTitle = () => {
        const startDate = new Date(customPeriod.start);
        const endDate = new Date(customPeriod.end);

        if (selectedPeriod === 'month') {
            return startDate.toLocaleString('default', { month: 'long' }) + ' ' + startDate.getFullYear();
        } else if (selectedPeriod === 'year') {
            return startDate.getFullYear().toString();
        } else { // custom period
            const formattedStartDate = `${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'short' })} ${startDate.getFullYear()}`;
            const formattedEndDate = `${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getFullYear()}`;
            return `${formattedStartDate} - ${formattedEndDate}`;
        }
    };

    useEffect(() => {
        if(selectedCalendar && selectedCalendar._id) {
            // Fetch data whenever selectedPeriod or customPeriod changes
            fetchFunction(selectedPeriod, customPeriod, accessToken)
                .then(response => {
                    const labels = response.map(item => item._id.toString());
                    const dataValues = response.map(item => {
                        return dataType === 'revenue' ? item.totalRevenue : item.count;
                    });
                    setChartData({
                        labels: labels,
                        datasets: [{
                            label: chartLabel,
                            data: dataValues,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        }],
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [selectedCalendar, selectedPeriod, customPeriod, accessToken, fetchFunction, dataType, chartLabel]);

    const handleDateForMonth = (date) => {
        setCustomPeriod({
            start: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
            end: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
            year: date.getFullYear(),
            month: date.getMonth() + 1
        });
    };

    const handleDateForYear = (date) => {
        setCustomPeriod({
            start: new Date(date.getFullYear(), 0, 1).toISOString(),
            end: new Date(date.getFullYear(), 11, 31).toISOString(),
            year: date.getFullYear()
        });
    };

    return (
        <Container className="my-4">
            <Row><Col><h2>{title}</h2></Col></Row>
            <Row>
                <Col xs={12} md={6}>
                    <DateSelector
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                        setCustomPeriod={setCustomPeriod}
                        handleDateForMonth={handleDateForMonth}
                        handleDateForYear={handleDateForYear}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <DataChart chartData={chartData} title={generateChartTitle()} yTitle={yTitle} />
                </Col>
            </Row>
        </Container>
    );
};

export default GenericAnalyticsSection;
