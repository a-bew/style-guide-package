import UserAvatarThumbnail from "@/components/ui/thumbnail/UserAvatarThumbnail"
import styles from './ImageOnline.module.scss'
import { memo } from "react";

interface Props {
    isOnline: boolean;
    avatarUrl: string;
    alt: string;
    name: string;
    width?: number;
    height?: number;
}

const ImageOnline = ({isOnline, avatarUrl = '', alt = '', name = "", width = 20, height = 20 }: Props) => {
    const [firstName, lastName] = name.split(/\s/g).length > 1 ? name.split(/\s/g) : name.split("");
    return (<div className={styles.profileImageWrapper}>
      <UserAvatarThumbnail imageUrl={avatarUrl} altText={alt || "Profile Name"} firstName = {firstName} lastName = {lastName} style = {{width, height}}/>  
      {isOnline ? <div className={styles.onlineIndicator} 
        
      />: <div className={styles.offlineIndicator}/>}
    </div>)
}

export default memo(ImageOnline);