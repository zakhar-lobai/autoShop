import React from 'react'
import { Link } from 'react-router-dom';

const Button = () => {
    return (
        <Link to="/our-fleet">
            <button className='bg-primary text-white p-10 ml-left mr-left m-5 text-base p-sm font-bold rounded-[10px] md:ml-8 hover:bg-hover duration-500 uppercase'>
                Book Online
            </button>
        </Link>

    )
}

export default Button