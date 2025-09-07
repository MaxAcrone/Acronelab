"use client";

import dynamic from 'next/dynamic';

// Динамический импорт компонента курсора с отключенным SSR
const CursorEffect = dynamic(() => import('./CursorEffect'), {
  ssr: false
});

const ClientCursorEffect = () => {
  return <CursorEffect />;
};

export default ClientCursorEffect;
