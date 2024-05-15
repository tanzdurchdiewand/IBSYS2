import React, { useState } from 'react';
import { Grid, Box, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { PlanningWorkstation } from '../types/productionPlanningTypes';

const ProductionPlanningTable = ({ workstations }: { workstations: PlanningWorkstation[] }) => {
    console.log(workstations);
    const [selectedTab, setSelectedTab] = useState<number | ''>('');

    const handleChange = (event: React.SyntheticEvent, newValue: number | '') => {
        setSelectedTab(newValue);
    };

    const filteredWorkstations = workstations.filter(
        (workstation) => workstation.availableTime.length > 0 && workstation.timeslots.length > 0
    );

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <Grid item xs={8}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={selectedTab} onChange={handleChange} aria-label="Days Tabs">
                        <Tab label="All Days" value="" />
                        {[1, 2, 3, 4, 5].map((day) => (
                            <Tab key={day} label={`Day ${day}`} value={day} />
                        ))}
                    </Tabs>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <TableContainer component={Paper} style={{ width: '850px' }}>
                    <Table style={{ minWidth: '850px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '50px',  fontWeight: 'bold', fontSize: '16px' }}>Workstation</TableCell>
                                <TableCell style={{ width: '200px', fontWeight: 'bold', fontSize: '16px' }}>Available Time</TableCell>
                                <TableCell style={{ width: '250px', fontWeight: 'bold', fontSize: '16px' }}>Timeslots</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredWorkstations.map((workstation) => (
                                <TableRow key={workstation.workstation}>
                                    <TableCell style={{ width: '50px' }}>{workstation.workstation}</TableCell>
                                    <TableCell style={{ width: '200px' }}>
                                        <ul>
                                            {workstation.availableTime
                                                .filter((timeSlot) => selectedTab === '' || timeSlot.day === selectedTab)
                                                .map((timeSlot, index) => (
                                                    <li key={index}>{`Day: ${timeSlot.day}, Available Time: ${timeSlot.availableTime}`}</li>
                                                ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell style={{ width: '250px' }}>
                                        <ul>
                                            {workstation.timeslots
                                                .filter((timeslot) => selectedTab === '' || timeslot.day === selectedTab)
                                                .map((timeslot, index) => (
                                                    <li key={index}>{`Day: ${timeslot.day}, Start: ${timeslot.start}, End: ${timeslot.end}, Production Order: ${timeslot.productionOrder}`}</li>
                                                ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default ProductionPlanningTable;
