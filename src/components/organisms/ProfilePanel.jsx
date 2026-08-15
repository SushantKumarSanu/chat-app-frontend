import  {useEffect, useState}  from "react";
import ProfileDetails from "./ProfileDetails.jsx";
import AvatarOptionsDialog from "./AvatarOptionsDialog.jsx";
import AvatarUploadForm from "./AvatarUploadForm.jsx";
import Avatar from "./Avatar.jsx";

function ProfilePanel({user}){
  const [profileView,setProfileView] = useState(null);

  const userAvatar = user?.avatar?.secure_url ;
  const userName =  user?.username;
  const userEmail = user?.email;
  const usersPrefix = userName.slice(0,2);

  useEffect(()=>{
    console.log(profileView);
  },[profileView]);
  
  
  const profileViewMap = {
    "avatar" : () => <Avatar selectPorfileView={setProfileView} profileView={profileView} />,

  }


    return <>
    <ProfileDetails  user={user} selectPorfileView={setProfileView}/>
    {/* <Avatar selectPorfileView={setProfileView} profileView={profileView} /> */}
    {profileViewMap[profileView]?.()};
    
    </>
};

export default ProfilePanel;