import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getRevenueForMonth, getRevenueForYear, getRevenueForPeriod } from '../../services/analyticService';
import RevenueChart from '../RevenueChart/RevenueChart';
import DateSelector from '../DateSelector/DateSelector';
import { useAuth } from '../../context/AuthContext';

const RevenueSection = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [customPeriod, setCustomPeriod] = useState({ start: '', end: '' });
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [chartTitle, setChartTitle] = useState('');
    const { accessToken } = useAuth();

    const handleDateForMonth = (date) => {
        setCustomPeriod({ start: date.toISOString(), end: date.toISOString() });
        setSelectedPeriod('month');
    };

    const handleDateForYear = (date) => {
        setCustomPeriod({ start: date.toISOString(), end: date.toISOString() });
        setSelectedPeriod('year');
    };

    const fetchAndSetData = async () => {
        try {
            let response;
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed

            if(selectedPeriod !== 'custom') {
                if(customPeriod.start !== '') {
                    currentYear = new Date(customPeriod.start).getFullYear();
                    currentMonth = new Date(customPeriod.start).getMonth() + 1;
                }

                const date = customPeriod.start === '' ? new Date() : new Date(customPeriod.start);

                if(selectedPeriod === 'month') {
                    setChartTitle(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
                    response = await getRevenueForMonth(currentYear, currentMonth, accessToken);
                } else if (selectedPeriod === 'year') {
                    setChartTitle(date.getFullYear().toString());
                    response = await getRevenueForYear(currentYear, accessToken);
                }
            } else if (selectedPeriod === 'custom' && customPeriod.start && customPeriod.end) {
                response = await getRevenueForPeriod(customPeriod.start, customPeriod.end, accessToken);
                setChartTitle(`${new Date(customPeriod.start).toLocaleDateString()} - ${new Date(customPeriod.end).toLocaleDateString()}`);
            }

            // Format the labels based on the selected period
            const labels = response.revenue.data.map(item => {
                if (selectedPeriod === 'year') {
                    // Format month number to month name
                    return new Date(0, item._id - 1).toLocaleString('default', { month: 'long' });
                }
                return item._id.toString(); // Assuming _id is the day number for month and custom views
            });

            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Total Revenue',
                    data: response.revenue.data.map(item => item.totalRevenue),
                    backgroundColor: 'rgba(0, 123, 255, 0.5)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1,
                }],
            });
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        }
    };

    useEffect(() => {
        fetchAndSetData();
    }, [selectedPeriod, customPeriod, accessToken]);

    return (
        <Container className="my-4">
            <Row><Col><h2>Revenue</h2></Col></Row>
            <Row>
                <Col xs={12} md={6}>
                    <DateSelector
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                        setCustomPeriod={setCustomPeriod}
                        setDateForMonth={handleDateForMonth}
                        setDateForYear={handleDateForYear}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col><RevenueChart chartData={chartData} title={chartTitle} /></Col>
            </Row>
        </Container>
    );
};

export default RevenueSection;
