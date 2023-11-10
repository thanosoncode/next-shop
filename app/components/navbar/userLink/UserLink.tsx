import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import UserMenu from './userMenu/UserMenu';
import { UserSession } from '@/app/utils/types';

interface UserLikProps {
  session: UserSession;
}

const UserLik = ({ session }: UserLikProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const handleUserMenuOpen = () => setUserMenuOpen(!userMenuOpen);

  return session && session.dbUser && session.dbUser.email ? (
    <div className='relative mr-1 ml-3'>
      <div onClick={handleUserMenuOpen} className='cursor-pointer duration-300'>
        {session.dbUser.image ? (
          <div className='relative w-6 h-6'>
            <Image
              className='rounded-full'
              src={session?.dbUser.image ?? ''}
              fill
              alt={session.dbUser?.name ?? ''}
              sizes='24px'
            />
          </div>
        ) : (
          <div className='w-8 h-8 border text-blue-500 bg-gray-200 flex justify-center items-center hover:bg-gray-300  border-gray-400 rounded-full'>
            <span> {session.dbUser.email[0].toUpperCase()}</span>
          </div>
        )}
      </div>
      <UserMenu
        userMenuOpen={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
      />
    </div>
  ) : (
    <Link
      href='/signin'
      className='font-medium text-sm hover:bg-neutral-200 rounded-full p-2 px-2.5 duration-200 text-center'
    >
      Sign in
    </Link>
  );
};

export default UserLik;
