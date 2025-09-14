'use client';
import { SessionProvider } from 'next-auth/react';

export function SessionAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

//Notas para mim mesmo:
// SessionProvider é um React Context do Auth.js.
// Ele fornece a sessão do usuário para toda a árvore de componentes.
// Sem ele, o hook useSession() não funciona.
