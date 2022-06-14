import styles from './dashboard-charts.module.scss';
import Chart from 'react-apexcharts';
import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { ApexOptions } from "apexcharts";

/* eslint-disable-next-line */
export interface DashboardChartsProps {}

export function DashboardCharts(props: DashboardChartsProps) {

  const optionspiechart: ApexOptions = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    labels: ['OPD', 'Critical', 'Ventilator', 'Recovering'],
    legend: {
      show: true,
      position: 'top',
      width: 300,
    },
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(236, 239, 241)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriespiechart = [45, 15, 27, 18];

  return (
    <PageContainer title="Patients">
      <Card>
        <Box p={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h4">Patients</Typography>
          </Box>
        </Box>
        <CardContent>
          <Chart options={optionspiechart} series={seriespiechart} type="pie" height="300px" />
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default DashboardCharts;
