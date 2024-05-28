import React from 'react';
import MagazineCard from './MagazineCard';
import Link from 'next/link';

const Magazine = ({ data }) => {
    const magazines = data?.data?.result;
    return (
        <div className='py-3'>
            <div className='px-1 md:px-10'>
                <div className="text-center mb-1">
                    <h1 className="text-text-xl md:text-[28px] capitalize avenir mb-1">
                        Blog
                    </h1>
                    <div className="text-center">
                        <Link
                            onClick={() => setQueryFromCategory(viewQuery)}
                            href={"/magazine"}
                            className="inline-block py-1  text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
                        >
                            VIEW ALL
                        </Link>
                    </div>
                    {/* <p className=" text-neutral">{subtitle}</p> */}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {magazines?.length > 0 && <>
                        {magazines?.slice(0, 3)?.map((magazine, index) => <MagazineCard key={index} data={magazine} />)}
                    </>}

                </div>
            </div>
        </div>
    );
};

export default Magazine;