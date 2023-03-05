const avatarId = Math.floor(Math.random() * 100);
export const RandomAvatar = ()=>{
  return 'https://api.multiavatar.com/'+avatarId.toString()+'.svg';
}

   
