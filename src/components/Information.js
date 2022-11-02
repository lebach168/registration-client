import React from "react";
import { useNavigate } from 'react-router-dom';
export default function Information() {
    var user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const handleOnClick = () => {
        localStorage.clear('user');
        navigate('/');
    }
    return (
        <div className="w-full h-auto overflow-scroll block h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center" >
            <div className="bg-white py-6 px-10 sm:max-w-md w-full ">
                <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                    Thông tin
                </div>
                <div className="sm:text-3xl text-sm font-semibold text-left  mb-12">
                    Username: {user.username}
                </div>
                <div className="sm:text-3xl text-sm font-semibold text-left  mb-12">
                    Email: {user.email}
                </div>
                <button className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold mx-auto" onClick={handleOnClick}>
                    Trở về
                </button>
            </div>
        </div>
    )
}