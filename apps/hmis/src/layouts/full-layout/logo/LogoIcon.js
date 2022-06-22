import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Icon, IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as LogoDark } from '../../../assets/images/logos/logo-dark.svg';
import { ReactComponent as LogoLight } from '../../../assets/images/logos/logo-white.svg';

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Box sx={{ width: '250px' }}>
        <Stack direction={'row'} alignItems='center'>
      <Link underline="none" to="/">
        {/* {customizer.activeMode === 'dark' ? <LogoLight /> : <LogoDark />} */}
      </Link>
        <IconButton>
          <Icon>local_hospital</Icon>
        </IconButton>
        <Typography variant="h4">Open-HMIS</Typography>
        </Stack>
    </Box>
  );
};

export default LogoIcon;
