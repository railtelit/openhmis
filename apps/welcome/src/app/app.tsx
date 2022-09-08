// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent, Typography } from '@mui/material';
import Landing from './Landing';
import styles from './app.module.scss';
import WelcomeMain from '../views/welcome-main/welcome-main';


export function App() {
  return (
    <>
      {/* Single Page */}
      <WelcomeMain />
      <div />
    </>
  );
}

export default App;
