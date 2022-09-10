import { Container, Grid, Typography } from '@mui/material';
import AppLinkCard from '../../components/app-link-card/app-link-card';
import PageFooter from '../../components/page-footer/page-footer';
import WelcomeHeader from '../../components/welcome-header/welcome-header';
import Projectimages from '../../sections/projectimages/projectimages';
import styles from './welcome-main.module.scss';

/* eslint-disable-next-line */
export interface WelcomeMainProps { }

export function WelcomeMain(props: WelcomeMainProps) {
  return (
    <div className={styles['container']}>
      
        
          
            <WelcomeHeader />
          
          <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">Building Digital Health <br/>ecosystem for all.</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">This is a free and open-source digital health service project as a part of Digital India and thrive the   <a href="https://abdm.gov.in" className="hover:underline">Ayushman Bharat Digital Mission</a> project.</p>
                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  
                </div>
              </div>
              <div className="  xs:flex lg:mt-0 lg:col-span-5 lg:flex" >
                <img src="assets/logo/mobiledoctor.jpeg" alt="hero image" />
              </div>
            </div>
          </section>
          <Projectimages />
          <div id="features" className='mt-1'>
            <Grid container>
              <Grid item  md={12} justifyContent={'center'} alignContent={'center'} className="py-2">
                  <Typography textAlign={'center'} variant='h5'>Features</Typography>
              </Grid>
              <Grid item xs={12} md={12} >
                <AppLinkCard title='Apna Health Sathi' description={
                    <p>
                      A Digital Health Companian at your fingertips. Manage Health Information and control the Personal Data Sharing to CareTeams. Seamlessly Login with ABHA address. Register easily using mobileno, AADHAAR or Driving License
                    </p>
                  }
                      img='https://peakspancapital.com/uploads/icons/themes/Digital-Health-1.png' />
                <AppLinkCard title='HFR' img='https://abdm.gov.in:8081/uploads/HFR_83b029dd20.svg' reverse={true}
                    description={ <p>
                      It is a comprehensive repository of health facilities of the nation across different systems of medicine. It includes both public and private health facilities including hospitals, clinics, diagnostic laboratories and imaging centers, pharmacies, etc. Enrolling in the Health Facility Registry will enable them to get connected to India\'s digital health ecosystem.' 
                    </p> }
                    />
                <AppLinkCard title='HIU' img='https://abdm.gov.in:8081/uploads/ABHA_No_b115ea676e.svg'
                  description={
                  <div>
                  The following capabilities are expected of HIU services in the federated health records context:
                  <ul>
                    <li>
                      Ability to search for and identify a patient by her ABHA Number, and seek consent to view her health records.
                    </li>
                    <li>
                        Once the consent is granted, use the HIU application to view the patient’s health records. This is particularly useful for verification of data formats when you as HIP are sending over patient’s health records.
                    </li>
                    <li>
                        Ability to request and receive data in a safe and secure manner, manage data lifecycle, and enable secure data storage and access.
                    </li>
                  </ul>
                </div>
                } />
              </Grid>
            </Grid>
          </div>


          <PageFooter />
      
    </div>
  );
}

export default WelcomeMain;
