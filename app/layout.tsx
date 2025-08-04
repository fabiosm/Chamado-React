import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import ViewListIcon from '@mui/icons-material/ViewList';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import theme from '../theme';
import { auth } from '../auth';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const NAVIGATION: Navigation = [
  {
    title: 'Meus tickets',
    icon: <ViewListIcon />,
  },
  {
    segment: 'novoTicket',
    title: 'Abrir ticket',
    icon: <ConfirmationNumberIcon />,
  },
  {
    title: 'Configurações',
    icon: <SettingsIcon />,
        children: [
      {
        title: 'Usuários',
        segment: 'users',
        icon: <ManageAccountsIcon />
      }
    ]
  }
  /*
  {
    segment: 'employees',
    title: 'Employees',
    icon: <PersonIcon />,
    pattern: 'employees{/:employeeId}*',
  },
  */
];

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              theme={theme}
              navigation={NAVIGATION}
              session={session}
              authentication={AUTHENTICATION}
            >
              {children}
            </NextAppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
