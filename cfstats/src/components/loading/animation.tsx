'use client'
import { useEffect, useState } from 'react';
import './animation.css';

function cfAnimation() {

    const [heights, setHeights] = useState([66, 100, 33]);

    useEffect(() => {
        const interval = setInterval(() => {
            const tmp = heights.map((val: number) => {return (Math.random() * 66 + 33)});
            setHeights(tmp);
        }, 3 * 1000);
        return () => clearInterval(interval);
    }, [])
    console.log("updated!");
    const style1 = {
        height: `${heights[0]}%`,
    }
    const style2 = {
        height: `${heights[1]}%`,
    }
    const style3 = {
        height: `${heights[2]}%`,
    }

    return (
        <div className="flex space-evenly h-24 w-24 transition-all duration-1000 ease-out scale-[-1]">
            <div className="w-5 bg-white" style={style1}>
                
            </div>
            <div className="w-5 bg-white" style={style2}>

            </div>
            <div className="w-5 bg-white" style={style3}>

            </div>
        </div>
    )
}


export default cfAnimation;