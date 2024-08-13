import React from "react";

interface DateDifferenceProps {
    createdAt : string;
}

const dateDifference: React.FC<DateDifferenceProps> = (createdAt) => {
    const createdDate = new Date(createdAt);
    console.log(typeof(createdAt));
    const currentDate = new Date();
    const difference = currentDate.getTime() - createdDate.getTime();

    const diffSeconds = Math.floor(difference / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffWeeks / 4.34524); // Approximate value
    const diffYears = Math.floor(diffMonths / 12);

    let result:string;

    if (diffSeconds < 60) {
        result = `${diffSeconds} ${diffSeconds > 1 ? "seconds" : "second" } ago`;
    } else if (diffMinutes < 60) {
        result = `${diffMinutes} ${diffMinutes > 1 ? "minutes" : "minute"} ago`;
    } else if (diffHours < 24) {
        result = `${diffHours} ${diffHours > 1 ? "hours" : "hour"} ago`;
    } else if (diffDays < 7) {
        result = `${diffDays} ${diffDays > 1 ? "days" : "day"} ago`;
    } else if (diffWeeks < 4) {
        result = `${diffWeeks} ${diffWeeks > 1 ? "weeks" : "week"} ago`;
    } else if (diffMonths < 12) {
        result = `${diffMonths} ${diffMonths > 1 ? "months" : "month"} ago`;
    } else {
        result = `${diffYears} ${diffYears > 1 ? "years" : "year"} ago`;
    }

    return result;
};

export default dateDifference;