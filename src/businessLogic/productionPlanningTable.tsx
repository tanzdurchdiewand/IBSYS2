import React, { useState } from 'react';
import { Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { PlanningWorkstation } from '../types/productionPlanningTypes';

const ProductionPlanningTable = ({ workstations }: { workstations: PlanningWorkstation[] }) => {
    console.log(workstations);
    const [selectedDay, setSelectedDay] = useState<number | ''>('');

  const handleDayChange = (event: SelectChangeEvent<number>) => {
    setSelectedDay(event.target.value as number | '');
  };

  const filteredWorkstations = workstations.filter(
    (workstation) => workstation.availableTime.length > 0 && workstation.timeslots.length > 0
  );

  return (
    <div>
      <Select
        value={selectedDay}
        onChange={handleDayChange}
        style={{ marginBottom: '10px' }}
      >
        <MenuItem value="">all days</MenuItem>
        {[1, 2, 3, 4, 5].map((day) => (
          <MenuItem key={day} value={day}>{`day ${day}`}</MenuItem>
        ))}
      </Select>
      <div style={{ maxHeight: '700px',  width: '800px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Workstation</TableCell>
                <TableCell>Available Time</TableCell>
                <TableCell>Timeslots</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWorkstations.map((workstation) => (
                <TableRow key={workstation.workstation}>
                  <TableCell>{workstation.workstation}</TableCell>
                  <TableCell>
                    <ul>
                      {workstation.availableTime
                        .filter((timeSlot) => selectedDay === '' || timeSlot.day === selectedDay)
                        .map((timeSlot, index) => (
                          <li key={index}>{`day: ${timeSlot.day}, availableTime: ${timeSlot.availableTime}`}</li>
                        ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul>
                      {workstation.timeslots
                        .filter((timeslot) => selectedDay === '' || timeslot.day === selectedDay)
                        .map((timeslot, index) => (
                          <li key={index}>{`day: ${timeslot.day}, start; ${timeslot.start}, end: ${timeslot.end}, productionOrder: ${timeslot.productionOrder}`}</li>
                        ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProductionPlanningTable;
