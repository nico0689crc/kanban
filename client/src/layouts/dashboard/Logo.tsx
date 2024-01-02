import { paths } from '@/routes/paths'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Box>
      <Link href={paths.dashboard.root}>
        <Image src='/logos/logo-96.png' alt="app-logo" width={60} height={60}/>
      </Link>
    </Box>
  )
}

export default Logo