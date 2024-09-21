import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    return { dateString, timeString: `${hours}:${minutes}:${seconds}` };
};

function Header({ onMenuClick }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const { dateString, timeString } = updateTime();
        setDate(dateString);
        setTime(timeString);
        const interval = setInterval(() => {
            const { dateString, timeString } = updateTime();
            setDate(dateString);
            setTime(timeString);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-[#011627] fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 text-white z-50">
            <button
                aria-label="Toggle Navigation"
                onClick={onMenuClick}
                className="text-white menu-btn" // Added class for better event handling
            >
                <RxHamburgerMenu size={24} />
            </button>
            <div className="text-right">
                <span className="text-lg">{date}</span><br />
                <span className="text-lg">{time}</span>
            </div>
        </header>
    );
}

export default Header;
