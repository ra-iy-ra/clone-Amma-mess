import React from 'react'
import img1 from '../../assets/logo.png'
import 
{BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill,BsGrid1X2Fill} from 'react-icons/bs';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                {/* <BsCart3  className='icon_header'/>  */}
                <img src={img1} alt="logo" style={{height:'90px',width:'90px'}} />
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/adminhome">
                    < BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/menu">
                    <BsFillArchiveFill className='icon'/> Menu
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/clusters">
                    <BsFillGrid3X3GapFill className='icon'/> Clusters
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/customer">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar