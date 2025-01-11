import classes from './AcceptInvitePage.module.css';
import { SignUp } from '@clerk/clerk-react';

export default function AcceptInvitePage() {
    return (
        <div className={classes[`accept-invite-container`]}>
            <SignUp forceRedirectUrl={'/pool-home'} />
        </div>
      );
    }