import styles from './dashboard-cards.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon } from '@mui/material';
// import {FeatherIcon} from 'feather-icons-react';

/* eslint-disable-next-line */
export interface DashboardCardsProps {
  icon: string;
  text_heading: string;
  total_count: string;
  text_total: string;
  text_sub: string;
  color?:string
  color_bg?:string
}

export function DashboardCards(props: DashboardCardsProps) {
  return (

    <Card>
      {/* sx={{backgroundColor: (theme) => theme.palette.info.main,color: 'white'}} */}
      <CardContent>
        <Box display="flex" alignItems="flex-start">
          <Typography variant="h4" fontWeight="700" sx={{marginBottom: '0'}} gutterBottom>
            {props.text_heading}
          </Typography>
          <Box sx={{marginLeft: 'auto'}}>
            <Icon>{props.icon}</Icon>
          </Box>
        </Box>
        <Typography variant="h1" fontWeight="500" sx={{ marginBottom: '0', marginTop: '20px' }} gutterBottom>
          {props.text_total}
        </Typography>
        <Typography variant="h3" fontWeight="600" color="textSecondary" sx={{ marginBottom: '0', opacity: '0.6' }} gutterBottom>
          {props.text_sub}
        </Typography>
      </CardContent>
    </Card>

  );
}

export default DashboardCards;
