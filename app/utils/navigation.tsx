import type { Navigation } from '@toolpad/core/AppProvider';
import ViewListIcon from '@mui/icons-material/ViewList';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Session } from 'next-auth';

export function getNavigation(session: Session | null): Navigation {

    let navigation: Navigation = [
        {
            segment: '/',
            title: 'Meus tickets',
            icon: <ViewListIcon />,
        },
        {
            segment: 'novoTicket',
            title: 'Abrir ticket',
            icon: <ConfirmationNumberIcon />,
        }
    ];

    if (session && session?.user?.isAdmin == true) {
        navigation.push(
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
        );
    }

    return navigation
}