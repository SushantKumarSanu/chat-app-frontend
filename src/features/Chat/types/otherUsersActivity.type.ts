interface Activity{
    isOnline:boolean,
    typing:boolean
}



type OtherUserActivity = Record<string,Activity>



export type {OtherUserActivity};