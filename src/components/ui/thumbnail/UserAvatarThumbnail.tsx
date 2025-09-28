import React, { useCallback, useState, useTransition, useEffect, memo } from "react";
import { loadImg } from "@/utils/functions";
import s from "./UserAvatarThumbnail.module.scss";

interface UserAvatarThumbnailProps {
  imageUrl: string;
  altText: string;
  firstName: string;
  lastName: string;
  isOnline?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  activeIconSize?: string
}

const UserAvatarThumbnail: React.FC<UserAvatarThumbnailProps> = ({
  onClick,
  imageUrl,
  altText,
  firstName,
  lastName,
  isOnline = false,
  style,
  activeIconSize
}) => {
  let initials = '';
  if (!firstName || !lastName) {
    initials = 'A';
  } else {
    initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  const [src, setSrc] = useState("");
  const [isPending, startTransition] = useTransition();

  const load = useCallback(() => {
    startTransition(() => {
      loadImg(imageUrl).then((src) => {
        if (src === "error") {
          // Handle error silently
        } else {
          setSrc(src);
        }
      });
    });
  }, [imageUrl]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      load();
    }
    return () => { mounted = false; };
  }, [load]);

  const avatarContainerClassName = `${s["avatar-container"]} ${isOnline ? s["online"] : ""}`;
  const styleX = {...style, "--active-icon-size": activeIconSize||''}
  return (
    <div 
      className={avatarContainerClassName} 
      style={styleX} 
      onClick={onClick}
      data-testid="user-avatar-thumbnail"
    >
      {src ? (
        <img src={imageUrl} alt={altText} className={s["avatar-image"]} />
      ) : (
        <div className={s["avatar-initials"]}>{initials}</div>
      )}
    </div>
  );
};

export default memo(UserAvatarThumbnail);