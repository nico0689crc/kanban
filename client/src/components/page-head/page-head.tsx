import { RouterLink } from '@/routes/components';
import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsLinkType } from './types';

type Props = {
  pageTitle: string;
  links?: BreadcrumbsLinkType[],
  action?: React.ReactNode
}

const PageHead = ({ pageTitle, links, action} : Props) => {

  const breadcrumStyles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex'
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='space-between' alignItems='center'>
      <Stack gap={{ xs: 0, md: 2 }} width={{ xs: '100%', sm: 'inherit' }}>
        { pageTitle && <Typography variant='h4'>{pageTitle}</Typography> }
        <Breadcrumbs separator={<Separator />} aria-label='breadcrumb'>
          {!!links?.length && links.map(link => (
            link.href ? (
              <Link key={link.name || ''} sx={breadcrumStyles} component={RouterLink} href={link?.href}>{link.name}</Link>
            ) : (
              <Box 
                key={link.name || ''} 
                component='span' 
                sx={{ ...breadcrumStyles, cursor: 'default', pointerEvents: 'none', color: 'text.disabled'}}
              >{link.name}</Box>
            )
          ))}
        </Breadcrumbs>
      </Stack>
      <Stack width={{ xs: '100%', sm: 'inherit' }} alignItems='end'>
        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>
    </Stack>
  );
}

const Separator = () => {
  return <Box
    component='span'
    sx={{
      width: 4,
      height: 4,
      borderRadius: '50%',
      bgcolor: 'text.disabled',
    }}
  />
}

export default PageHead