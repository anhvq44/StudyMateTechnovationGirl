import React from "react";
function CardWithIcon({icon: Icon, title, color, description}){
    return (
        <div className="relative w-[300px] h-[280px] shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className={`absolute -top-10 w-20 h-20 rounded-full ${color} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-medium text-[#2F327D] mt-8 mb-4">{title}</h3>
            <p className="text-[#696984] text-center">{description}</p>
        </div>
    );
}

export default CardWithIcon