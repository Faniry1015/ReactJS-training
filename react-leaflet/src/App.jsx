import React from 'react'
import './App.css'
import { LeafletMap } from './Components/LeafletMap.jsx';
import { Container, Typography, Grid, Box } from '@mui/material';

function App() {

  return (
    <Container spacing={2}>
      <Typography>Carte des interventions secteur Agriculture et Elevage Vakinankaratra</Typography>
      <Grid>
        <Grid item >
          <Box>

          </Box>
        </Grid>
        <Grid item>
          <LeafletMap />
        </Grid>

      </Grid>
    </Container>
  )
}

export default App
