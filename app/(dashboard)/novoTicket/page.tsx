'use client';
import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import { customBreadcrumbs } from '@/app/utils/breadcrumbs';

export default function NovoTicketPage() {
  return (
    <PageContainer breadcrumbs={customBreadcrumbs()}>
      <h1>TESTE</h1>
    </PageContainer>
  );
}
