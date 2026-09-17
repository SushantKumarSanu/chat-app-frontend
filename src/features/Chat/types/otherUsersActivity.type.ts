interface Activity{
    isOnline:boolean,
    typing:string|undefined
}



type OtherUsersActivity = Record<string,Activity>



export type {OtherUsersActivity};