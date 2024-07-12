"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideNav from './_components/SideNav';

function Dashboardlayout(
    {
    children,
}: Readonly<{
  children: React.ReactNode;
}>
) {

  const convex=useConvex();
  const {user}:any=useKindeBrowserClient();
  const router=useRouter();

  useEffect(()=>{
    user&&checkTeam();
  },[user])

  const checkTeam=async()=>{
    const result=await convex.query(api.teams.getTeam,
      {email:user?.email});

      if(!result?.length)
      {
         router.push('teams/create')
      }
  }

  
  return (
      <div>
        <div className='grid grid-cols-4'>
          <div>
            <SideNav/>
          </div>
          <div className='grid-cols-3'>
            {children}
          </div>
        </div>
      </div>

    )
}

export default Dashboardlayout