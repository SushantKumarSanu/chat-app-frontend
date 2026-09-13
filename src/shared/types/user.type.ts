export interface User{
    _id:string,

    username:string,

    email:string,

    avatar:{
        public_id:string,
        secure_url:string
    },

    isOnline:boolean,

    createdAt:string,

    updatedAt:string

}
