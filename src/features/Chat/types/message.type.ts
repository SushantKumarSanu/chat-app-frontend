import type { User } from "../../../shared/types/user.type"

interface Message{
    _id:string,

    chat:string,

    messageType:"text"|"code",

    content:string,

    deliveredTo:string[],

    createdAt:string,

    updatedAt:string,

    sender:User
}


export type {Message};