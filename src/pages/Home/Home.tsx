import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../components/Page/Page';

export const Home = (): JSX.Element => {
  const homeText = 'Home';

  return (
    <Page description={homeText} keywords={homeText} title={homeText}>
      <Button component={Link} to="/preview" variant="contained">
        Preview
      </Button>
    </Page>
  );
};
