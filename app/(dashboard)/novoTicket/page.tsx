'use client';
import { customBreadcrumbs } from '@/app/utils/breadcrumbs';
import { PageContainer } from '@toolpad/core';


export default function NovoTicketPage() {

  return (
    <PageContainer breadcrumbs={customBreadcrumbs()}>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <input type="checkbox" name="terceiro" id="terceiro" />
          Abrir em nome de terceiros
        </div>

        <div style={{ width: '35%' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="usuario">Usuário Solicitante:</label><br />
            <select
              id="usuario" required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Selecione</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ marginBottom: '1rem', minWidth: '35%' }}>
            <label htmlFor="setor">Setor responsável:</label><br />
            <select
              id="setor" required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Selecione</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem', minWidth: '35%' }}>
            <label htmlFor="tipo">Tipo de solicitação:</label><br />
            <select
              id="tipo" required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Selecione</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="arquivo">Arquivo:</label><br />
          <input
            type="file"
            id="arquivo"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="solicitacao">Solicitação:</label><br />
          <textarea
            id="solicitacao"
            rows={4}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Enviar
        </button>
      </form>
    </PageContainer>
  );
};