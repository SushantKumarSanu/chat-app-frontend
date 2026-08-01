
function SidebarHeader({user}){

    
    const userName = user?.username;



    return  <div className="sidebar-header">
                <div className="avatar">PFL</div>
                <span className="name">{userName}</span>
        </div>

}



export default SidebarHeader;