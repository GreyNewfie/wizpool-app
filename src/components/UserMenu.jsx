import classes from './UserMenu.module.css';
import {
    SignedOut,
    SignedIn,
    SignInButton,
    UserButton,
  } from '@clerk/clerk-react';

  const TrophyIcon = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }}>
      <img
        src='./wizpool-trophy-icon-512x512.png'
        alt='WizPool trophy icon'
        width={20}
        height={20}
      />
    </div>
  );

  export default function UserMenu() {
    const baseURL = import.meta.env.BASE_URL || '/';
    
    return (
        <>
        <SignedOut>
            <SignInButton className={classes['sign-in-btn']} />
        </SignedOut>
        <SignedIn>
            <UserButton>
            <UserButton.MenuItems>
            <UserButton.Link
                label='Create a New Pool'
                href={`${baseURL}choose-league`}
                labelIcon={<TrophyIcon />}
            />
            <UserButton.Link
                label='Delete a Pool'
                href={`${baseURL}delete-pool`}
                labelIcon={<TrophyIcon />}
            />
            </UserButton.MenuItems>
            </UserButton>
        </SignedIn>
        </>
    )

  }