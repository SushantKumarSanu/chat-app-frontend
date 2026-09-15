import type { User } from "../../../shared/types/user.type"

export interface Chat{

    _id:string,

    unreadCount:number,

    isGroupChat:boolean,

    lastRead:Record<string,string>|null,

    users:User[],

    groupName?:string,

    groupAdmin?:string,

    lastMessage?:{

        messageId?:string,

        sender?:string,

        content?:string
    }

    createdAt:string,

    updatedAt:string

}