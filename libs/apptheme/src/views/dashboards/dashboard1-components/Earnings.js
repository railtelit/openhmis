import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const Earnings = () => (
  <Card
    sx={{
      backgroundColor: (theme) => theme.palette.primary.main,
      color: 'white',
    }}
  >
  <CardContent>
      <Box display="flex" alignItems="flex-start">
          <Typography variant="h3" sx={{marginBottom: '0',}} gutterBottom>Appointments</Typography>
          <Box sx={{marginLeft: 'auto'}}>
              <Fab size="medium" color="" aria-label="add" elevation="0" sx={{boxShadow: 'none'}}>
                  <FeatherIcon icon="list" />
              </Fab>
          </Box>
      </Box>
      <Typography variant="h1" fontWeight="500" sx={{marginBottom: '0',marginTop: '15px'}} gutterBottom>
          49
      </Typography>
      <Typography variant="h4" fontWeight="400" sx={{marginBottom: '0',opacity: '0.6'}} gutterBottom>
          Out of 120
      </Typography>
    </CardContent>
  </Card>
);

export default Earnings;
