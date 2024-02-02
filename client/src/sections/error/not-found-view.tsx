'use client';

import React from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';

import PageNotFoundIllustration from '@/assets/illustrations/page-not-found-illustration';

type PropsType = {
  title: string,
  subTitle: string,
  caButton: React.ReactNode
}

const bounceIn = {
  initial: {},
  animate: {
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    opacity: [0, 1, 1, 1, 1, 1],
    transition: { 
      durationIn: 0.64, 
      easeIn: [0.43, 0.13, 0.23, 0.96] 
    },
  },
  exit: {
    scale: [0.9, 1.1, 0.3],
    opacity: [1, 1, 0],
  }
}

export default function NotFoundView({ title, subTitle, caButton } : PropsType) {
  

  return (
    <Container component="main">
      <Stack
        sx={{
          m: 'auto',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Box
          component={m.div}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05,
              },
            },
            exit: {
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
              },
            },
          }}
        >
          <m.div variants={bounceIn}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {title}
            </Typography>
          </m.div>
          <m.div variants={bounceIn}>
            <Typography sx={{ color: 'text.secondary' }}>
              {subTitle}
            </Typography>
          </m.div>
          <m.div variants={bounceIn}>
            <PageNotFoundIllustration
              sx={{ height: 260 }}
            />
          </m.div>
          {caButton}
        </Box>
      </Stack>
    </Container>
  );
}
