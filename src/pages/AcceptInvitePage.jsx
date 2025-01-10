import classes from './AcceptInvitePage.module.css';
import { SignUp } from '@clerk/clerk-react';

export default function AcceptInvitePage() {
    // Get the invitation ID from the URL
    // Use Clerk's SDK to accept the invitation

    return (
        <div className={classes[`accept-invite-container`]}>
            <SignUp />
        </div>
      );
    }