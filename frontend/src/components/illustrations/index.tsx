'use client';

import React from 'react';

import { Container, Stack, Typography } from '@mui/material';

type PropsType = {
  title?: string,
  subTitle?: string,
  caButton?: React.ReactNode,
  illustration: React.ReactNode,
  maxWidth?: number
}

export default function Illustration({ title, subTitle, caButton, illustration, maxWidth } : PropsType) {
  return (
    <Container component="main">
      <Stack
        spacing={2}
        alignItems='center'
        sx={{
          m: 'auto',
          maxWidth: maxWidth ?? 600,
          textAlign: 'center',
        }}
      >
        {title &&(
          <Typography variant="h3" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        {subTitle &&(
          <Typography sx={{ color: 'text.secondary' }}>
            {subTitle}
          </Typography>
        )}
        {illustration}
        {caButton && caButton}
      </Stack>
    </Container>
  );
}
