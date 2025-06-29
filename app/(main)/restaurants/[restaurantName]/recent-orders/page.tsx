import React from 'react';
import { ArrowUpDownIcon, ListFilter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orders } from '@/data/data';
import { DataTable } from '../components/data-table';
import { columns } from './columns';

const Page = () => {
    return (
        <>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <Input type="text" placeholder="Search by name...">
                    <Search width={15} height={15} className="text-input" />
                </Input>
                <div className='flex items-center gap-4 md:mt-0 mt-5'>
                    <Button variant="outline">
                        <ArrowUpDownIcon />
                        Sort by
                    </Button>
                    <Button variant="outline">
                        <ListFilter />
                        Filter
                    </Button>
                </div>
            </div>
            <main>
                <DataTable columns={columns} data={orders} />
            </main>
        </>
    )
}

export default Page
