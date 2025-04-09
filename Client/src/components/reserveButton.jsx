import {CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

function ReserveButton({}) {

    return (
        <Link to="/login" className="fixed z-10 bg-[#ff3e01] shadow-xl bottom-[10%] right-[40px] p-4 rounded-full hover:brightness-110 hover:scale-105  transition-all">
            <CalendarDays className="text-white" size={30} />
        </Link>
    );
}

export default ReserveButton;