'use client';

import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import DashboardContent from './DashboardContent';

import { customBreadcrumbs } from '../utils/breadcrumbs';

export default function Dashboard() {
  return (
    <PageContainer breadcrumbs={customBreadcrumbs()}>
      <DashboardContent />
    </PageContainer>
  );
}

