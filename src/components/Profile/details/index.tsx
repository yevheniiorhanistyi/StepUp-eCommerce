'use client';

import PasswordChange from './PasswordChange';
import UserIcon from './UserIcon';
import UserInfo from './UserInfo';

const UserDetails = (): JSX.Element => {
  return (
    <div className="flex justify-between w-full md:gap-8 gap-4 ">
      <UserIcon></UserIcon>
      <UserInfo></UserInfo>
      <PasswordChange></PasswordChange>
    </div>
  );
};

export default UserDetails;
