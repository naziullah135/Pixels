import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { convertTimestamp2 } from '../../../lib/convertTimestampDateAndTime';

const MagazineCard = ({ data }) => {
    return (
        <div className='w-full p-3 bg-white'>
            <Link href={`/magazine/${data?._id}`}>
                <img
                    src={data?.image}
                    width={700}
                    height={300}
                    className='w-full h-[250px]'
                />
            </Link>
            <Link href={`/magazine/${data?._id}`}>
                <p className='my-4 text-lg md:text-xl avenir'>{data?.title}</p>
            </Link>
            <span className='text-light-text text-sm'>{convertTimestamp2(data?.createdAt)}</span>
        </div>
    );
};

export default MagazineCard;