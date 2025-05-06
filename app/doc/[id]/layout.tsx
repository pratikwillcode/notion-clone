import RoomProvider from '@/components/RoomProvider';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function DocLayout({children, params:{id}}:{children: React.ReactNode,
    params:{
        id: string;
    }
}) {
    // auth.protect();
    const {sessionClaims} = await auth()
    if(!sessionClaims){
      redirect('/sign-in'); 
    }
  return (
    <RoomProvider roomId={id}>{children}</RoomProvider>
  )
}

export default DocLayout