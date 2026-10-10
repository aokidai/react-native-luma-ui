import React from 'react';
import type { PropDefinition } from '../types';

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <div className="props-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th style={{ width: '22%' }}>Thuộc tính (Prop)</th>
            <th style={{ width: '32%' }}>Kiểu (Type)</th>
            <th style={{ width: '18%' }}>Mặc định (Default)</th>
            <th style={{ width: '28%' }}>Mô tả</th>
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
                    Bắt buộc
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
