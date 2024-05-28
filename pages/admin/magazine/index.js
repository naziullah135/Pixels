import React from 'react';
import { useQuery } from 'react-query';
import { server_url_v3 } from '../../../lib/config';
import DashboardLayout from '../../../src/Components/DashboardLayout';
import MagazineTableRow from '../../../src/Components/Admin/Magazine/MagazineTableRow';
import AdminDashboardBreadcrumb from '../../../src/Shared/AdminDashboardBreadcrumb';

const index = () => {
    const { data, refetch } = useQuery({
        queryKey: ["magazineData"],
        queryFn: () =>
            fetch(
                `${server_url_v3}/custom?modelName=Blog`
            ).then((res) => res.json()),
    });
    const magazineData = data?.data?.result;
    console.log(magazineData)
    return (
        <>
            <DashboardLayout>
                <AdminDashboardBreadcrumb
                    title={"All Magazine"}
                />
                <div className='w-full md:w-11/12 mx-auto my-5'>
                    <div className="overflow-x-auto border shadow-md bg-white rounded-lg">
                        <table className="table table-compact w-full">
                            <thead className="">
                                <tr>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        Image
                                    </th>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        Title
                                    </th>
                                    <th className="bg-gray-300 text-start p-3 text-xs  font-bold">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {magazineData?.length > 0 ? <>
                                    {magazineData?.map((f, index) => (
                                        <>
                                            {" "}
                                            <MagazineTableRow key={index} data={f} refetch={refetch} />
                                        </>
                                    ))}
                                </> : <>
                                    <div className='flex items-center px-5 h-[10vh]'>
                                        <p className='text-gray-600 text-lg'>No Magazine Yet</p>
                                    </div>
                                </>}

                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default index;