// React
import type { Metadata } from 'next';

// Localization
import 'src/locales/i18n';
import LocalizationProvider from '@/locales/localization-provider'

// Settings
import { SettingsProvider } from '@/components/settings'

// Theme 
import ThemeProvider from '@/theme';
import { primaryFont } from '@/theme/typography';

// Authorization
import { AuthProvider } from '@/auth/context/AuthProvider';
import { AuthConsumer } from '@/auth/context/AuthConsumer';
import ProgressBar from '@/components/progress-bar';

export const metadata: Metadata = {
  title: 'Kanban MVP',
  description: 'Generated by create next app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '72x72',
      url: '/favicon/android-chrome/favicon-72.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon/android-chrome/favicon-96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '57x57',
      url: '/favicon/ios-web-safari/favicon-57.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '60x60',
      url: '/favicon/ios-web-safari/favicon-60.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '72x72',
      url: '/favicon/ios-web-safari/favicon-72.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '76x76',
      url: '/favicon/ios-web-safari/favicon-76.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/web/favicon-16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/web/favicon-32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/favicon/web/favicon-96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '70x70',
      url: '/favicon/windows/favicon-70.png',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // return (
  //   <html lang="en" className={primaryFont.className}>
  //     <body>
  //       <AuthProvider>
  //         <LocalizationProvider>
  //           <SettingsProvider defaultSettings={{ themeMode: 'light' }}>
  //             <ThemeProvider>
  //               <ProgressBar />
  //               <AuthConsumer>
  //                 {children}
  //               </AuthConsumer>
  //             </ThemeProvider>
  //           </SettingsProvider>
  //         </LocalizationProvider>
  //       </AuthProvider>
  //     </body>
  //   </html>
  // )

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <LocalizationProvider>
          <SettingsProvider defaultSettings={{ themeMode: 'light' }}>
            <ThemeProvider>
              <ProgressBar />
              <AuthConsumer>
                {children}
              </AuthConsumer>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </body>
    </html>
  )
}
