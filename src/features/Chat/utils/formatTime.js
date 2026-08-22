export const formatTime = (date)=>{
    const nowDate = new Date();
    const msgDate = new Date(date);
    const yesterday = new Date(nowDate);
    yesterday.setDate(nowDate.getDate()-1);
    const isToday =
    nowDate.toDateString() === msgDate.toDateString();
    const isYesterday = 
    yesterday.toDateString() === msgDate.toDateString();

    if(isToday) {
        return msgDate.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        })
    }
    if(isYesterday){
        return "Yesterday"
    }
    return msgDate.toLocaleDateString([],{
        day: "numeric",
        month: "short",
    })
}