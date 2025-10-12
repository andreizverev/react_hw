import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import type { FC } from 'react';

export const Header: FC = () => {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar>
                <Link href={'/'} variant="button">
                    <Typography variant="h6" component="h6">
                        Home
                    </Typography>
                </Link>

                <Box component="nav" sx={{ ml: 'auto' }}>
                    <Link href="/formik" sx={{ mx: 1 }}>
                        Formik
                    </Link>
                    <Link href="/rhf" sx={{ mx: 1 }}>
                        RHF
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
