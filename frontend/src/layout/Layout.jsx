import React, { useCallback, useState } from 'react'
import Footer from '../footer/Footer';
import Navbar from '../header/Header';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { TbReport } from 'react-icons/tb';
import { BiSpreadsheet } from 'react-icons/bi';
import {MdOutlineAccountBalanceWallet, MdOutlineFolder, MdOutlineSell, MdWebAsset } from 'react-icons/md';
import { SlPeople } from 'react-icons/sl';
import { FaRegMessage } from 'react-icons/fa6';

import './layout.css';
import { BsShieldLock } from 'react-icons/bs';
import { LuLayoutList } from 'react-icons/lu';
import { GrResources } from 'react-icons/gr';
import { HiOutlineSquaresPlus } from 'react-icons/hi2';
import { Card, CardContent, CardHeader, Collapse, Container, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import {KeyboardArrowUp, KeyboardArrowDown, FaceRetouchingNatural, Article, Edit, ExpandMore, ExpandLess} from  "@mui/icons-material"; 
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CollapseButton from '../components/collapse/CollapseButton';

const Layout =  () => {
  (function(){
    document.querySelectorAll('.aside .item').forEach(function(ele, idx) {
      ele.addEventListener('click', function(e) {
          var clickedEle = document.querySelector('.aside .active');
          if (clickedEle != null)
              clickedEle.classList.remove('active');
          this.classList.add('active');
      })
  });
  }());
  const user = {
    "name":"Athanas Shauritanga",
    "isadmin":true
  }
  return (
    <div className='layout'>
        <Navbar user ={user}/>
        <div className="container">
          <div className="menuContainer">
            <div className="aside">
              <Link to="/dashboard" className="item active" >
                <RxDashboard />
                <span>Dashboard</span>
              </Link>
              <CollapseButton  icon={<MdOutlineSell />}  name="Orders" className="item">
                <div>
                  <Link to="/orders" className="item">
                    <BiSpreadsheet />
                    <span>All orders</span>
                  </Link>
                </div>
              </CollapseButton>
              <Link to="/dealing" className="item">
                <BiSpreadsheet />
                <span>Dealing sheet</span>
              </Link>
              <Link to="/reports" className="item">
                <TbReport />
                <span>Market Reports</span>
              </Link>
              <Link to="/assets" className="item">
                <MdWebAsset />
                <span>Asset Management</span>
              </Link>
              <CollapseButton icon={<SlPeople/>} name="CRM">
                <>
                  <Link to="/customers" className="item">
                  <SlPeople />
                  <span>Customers</span>
              </Link>
                </>
              </CollapseButton>
              
              <Link to="/files" className="item">
                <MdOutlineFolder />
                <span>File Manager</span>
              </Link>
              <Link to="/messages" className="item">
                <FaRegMessage />  
                <span>Messaging</span>
              </Link>
              {user.isadmin && <>
              <CollapseButton icon={<MdOutlineAccountBalanceWallet />} name="Accounting" className='item'>
                <div>
                    <Link to="/transactions" className="item">
                      <GrResources /> 
                      <span>Transactions</span>
                    </Link>
                    <Link to="/expenses" className="item">
                      <GrResources /> 
                      <span>Expenses</span>
                    </Link>
                    <Link to="/receipts" className="item">
                      <GrResources /> 
                      <span>Receipts</span>
                    </Link>
                </div>
              </CollapseButton>
              <Link to="/payroll" className="item">
              <LuLayoutList />
                <span>Payroll</span>
              </Link>
              <Link to="/resources" className="item">
              <GrResources /> 
                <span>Human Resourses</span>
              </Link>
              <Link to="/securities" className="item">
              <BsShieldLock /> 
                <span>Securities</span>
              </Link>
              <Link to="/business" className="item">
                <MdOutlineAccountBalanceWallet /> 
                <span>Business</span>
              </Link>
              <Link to="/roles" className="item">
              <HiOutlineSquaresPlus /> 
                <span>Roles</span>
              </Link>
              <Link to="/logout" className="item">
                <MdOutlineAccountBalanceWallet /> 
                <span>Logout</span>
              </Link>
              </>
              }
            </div>
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Layout;