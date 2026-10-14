import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PropDefinition } from '../types';

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const { t } = useTranslation();

  return (
    <div className="props-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th style={{ width: '22%' }}>{t('componentDoc.propColName')}</th>
            <th style={{ width: '32%' }}>{t('componentDoc.propColType')}</th>
            <th style={{ width: '18%' }}>{t('componentDoc.propColDefault')}</th>
            <th style={{ width: '28%' }}>{t('componentDoc.propColDesc')}</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td>
                <span className="prop-name">{p.name}</span>
                {p.required && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: 6,
                      fontSize: 10,
                      fontWeight: 700,
                      color: 'var(--md-sys-color-error)',
                      background: 'var(--md-sys-color-error-container)',
                      padding: '1px 5px',
                      borderRadius: 4,
                    }}
                  >
                    {t('componentDoc.required')}
                  </span>
                )}
              </td>
              <td>
                <span className="prop-type">{p.type}</span>
              </td>
              <td>
                <span className="prop-default">{p.defaultValue || '—'}</span>
              </td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

