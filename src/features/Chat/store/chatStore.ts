import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { ActiveChatState } from "./slices/activeChatSlice";
import type { ChatListState } from "./slices/chatListSlice";
import type { MessagesState } from "./slices/messagesSlice";
import type { OtherUsersActivityState } from "./slices/otherUserActivitySlice";

import { createChatListSlice } from "./slices/chatListSlice";
import { createActiveChatSlice } from "./slices/activeChatSlice";
import { createMessagesSlice } from "./slices/messagesSlice";
import { createOtherUserActivitySlice } from "./slices/otherUserActivitySlice";

type ChatStore = ActiveChatState & ChatListState & MessagesState & OtherUsersActivityState


const useChatStore = create<ChatStore>()(
    devtools((...args)=>({
        ...createChatListSlice(...args),
        ...createActiveChatSlice(...args),
        ...createMessagesSlice(...args),
        ...createOtherUserActivitySlice(...args)
    }))
);
