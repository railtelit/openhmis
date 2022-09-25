import { useKeycloak } from '@ha/authstore';
import { Avatar, Box, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import styles from './app-toolbar.module.scss';

/* eslint-disable-next-line */
export interface AppToolbarProps {}
interface MenuActionInterface{
    label:string,action:()=>void
}
export function AppToolbar(props: AppToolbarProps) {
  const kc=useKeycloak()
  const menuActions:MenuActionInterface[]=[
      {label:'Logout',action:()=>{
          kc?.logout();
      }}  
  ]
  return (
     <Toolbar disableGutters >
        <Container maxWidth={'xl'}>
            <Toolbar>
                <Typography variant='h6'>ADMIN-CONTROL</Typography>
                <Box display={'flex'} flexGrow={1}>

                </Box>
                
                <Box display={'flex'} flexGrow={0}>
                    <IconButton>
                        <Avatar alt='User'>
                          <Icon>user</Icon>
                        </Avatar>
                    </IconButton>
                </Box>

            </Toolbar>

        </Container>
     </Toolbar>
  );
}

export default AppToolbar;
