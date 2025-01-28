import useAvatar from '~/hooks/Messages/useAvatar';
import { UserIcon } from '~/components/svg';

const Avatar = ({ user }) => {
  const avatarSrc = useAvatar(user);

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-8 w-8 rounded-full foreground flex items-center justify-center flex-shrink-0">
        {!avatarSrc ? (
          <div
            style={{
              backgroundColor: 'rgb(121, 137, 255)',
              width: '32px',
              height: '32px',
              boxShadow: 'rgba(240, 246, 252, 0.1) 0px 0px 0px 1px',
            }}
            className="relative flex items-center justify-center rounded-full p-1 text-text-primary"
            aria-hidden="true"
          >
            <UserIcon />
          </div>
        ) : (
          <img
            className="rounded-full"
            src={avatarSrc}
            alt={`${user?.username || ''}'s avatar`}
          />
        )}
      </div>
    </div>
  );
};

export default Avatar;