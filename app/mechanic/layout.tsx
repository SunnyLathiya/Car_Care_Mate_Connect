"use client"
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Loader from '@/components/common/loader';
import MechanicHome from '@/components/mechanic/MechanicHome';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [accountType, setAccountType] = useState<string | null>(null);
  useEffect(() => {
    const fetchAccountType = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const type = decodedToken.accountType;
          setAccountType(type);
          console.log("Account Type:", type);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    fetchAccountType();
  }, []);

  if (accountType !== 'Mechanic') {
    return <Loader />; 
  }

  return (
    <>

      {children}
      {accountType === 'Mechanic' && <MechanicHome/>}
    
    </>
  );
}

