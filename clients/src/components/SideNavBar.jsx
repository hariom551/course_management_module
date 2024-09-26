import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbMessageFilled } from "react-icons/tb";
import axios from 'axios';

function SideNavBar({ show }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/users/logoutuser`);
            if (response.data.success) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = '/email';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div 
            className={`fixed top-0 left-0 h-full w-60 bg-[#011627] p-6 transition-transform duration-300 ease-in-out z-50 ${show ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <nav className="pt-12">
                <ul className="list-none p-0">
                    <li><h5 className="text-lg font-bold text-white">NAVIGATION</h5></li>

                    <li className="my-2">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                        >
                            <TbMessageFilled className="text-2xl" />
                            Home
                        </Link>
                    </li>

                    <li className="my-2">
                        <Link 
                            to="/createCategory" 
                            className="flex items-center gap-2 p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                        >
                            <TbMessageFilled className="text-2xl" />
                            Create Category
                        </Link>
                    </li>

                    <li className="my-2">
                        <Link 
                            to="/CreateCourse" 
                            className="flex items-center gap-2 p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                        >
                            <TbMessageFilled className="text-2xl" />
                            Create New Course
                        </Link>
                    </li>

                    {/* <li className="my-2">
                        <Link 
                            to="/sms" 
                            className="flex items-center gap-2 p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                        >
                            <TbMessageFilled className="text-2xl" />
                            SMS
                        </Link>
                    </li> */}
                    {/* <li className="my-2">
                        <Link 
                            to="/whatsapp" 
                            className="flex items-center gap-2 p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                        >
                            <IoLogoWhatsapp className="text-2xl" />
                            WHATSAPP
                        </Link>
                    </li> */}
                    {/* <li className="my-2">
                        <Link 
                            to="/email" 
                            className="flex items-center gap-2 p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                        >
                            <MdEmail className="text-2xl" />
                            EMAIL
                        </Link>
                    </li> */}
                    <li className="my-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full text-left p-2 text-base text-[#eaecef] rounded hover:bg-[#172b4d] transition-colors duration-200"
                            disabled={isLoggingOut}
                        >
                            <IoLogOutSharp className="text-2xl" />
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideNavBar;
