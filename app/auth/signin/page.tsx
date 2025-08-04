'use client';
import * as React from 'react';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import { SignInPage } from '@toolpad/core/SignInPage';
import { providerMap } from '../../../auth';
import signIn from './actions';
import { Button } from '@mui/material';

function ForgotPasswordLink() {
  return (
    <span>
      <Link fontSize="0.75rem" href="/auth/forgot-password">
        Forgot password?
      </Link>
    </span>
  );
}

function SignUpLink() {
  return (
    <span style={{ fontSize: '0.8rem' }}>
      Don&apos;t have an account?&nbsp;<Link href="/auth/signup">Sign up</Link>
    </span>
  );
}

function Title()
{
  return (
    <h1>Tickets</h1>
  )
}

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
      slots={{
        forgotPasswordLink: ForgotPasswordLink,
        signUpLink: SignUpLink,
        title: Title,
        submitButton(props) {
          return (
            <Button variant="outlined" type="submit" fullWidth {...props}>
              Sign in
            </Button>
          );
        },
      }}
    />
  );
}
