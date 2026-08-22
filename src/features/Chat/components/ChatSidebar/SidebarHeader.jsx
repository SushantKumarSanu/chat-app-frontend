
function SidebarHeader({user}){

    
    const userName = user?.username;



    return <div className="h-16 px-6 flex items-center justify-between border-b border-outline-variant/30 shrink-0">
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Inbox</h2>
<button className="text-on-surface-variant hover:text-on-surface transition-all duration-300 ease-out active:scale-90 p-2 rounded-xl hover:bg-surface-variant/30">
<span className="material-symbols-outlined">edit_square</span>
</button>
</div>
        
        // <div className="sidebar-header">
        //         <div className="avatar">PFL</div>
        //         <span className="name">{userName}</span>
        // </div>

}



export default SidebarHeader;