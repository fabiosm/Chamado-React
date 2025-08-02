'use client';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const filas = [
  {
    id: 1,
    title: '5',
    description: 'PENDENTES',
    color: '#DC3545',
  },
  {
    id: 2,
    title: '2',
    description: 'ANDAMENTO',
    color: '#d9a302'
  },
  {
    id: 3,
    title: '0',
    description: 'ENCERRADOS',
    color: '#00695C'
  },
];

export default function DashboardContent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >

          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
              gap: 2,
            }}
          >
            {filas.map((fila, index) => (
              <Card key={index} sx={{ backgroundColor: fila.color, color: '#fff', height: '100%' }}>
                <CardActionArea
                  sx={{
                    height: '100%',
                    '&[data-active]': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selectedHover',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h5" component="div">
                      {fila.title}
                    </Typography>
                    <Typography variant="body2">
                      {fila.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

        </Stack>
      </Box>
    </Box>
  );
}
