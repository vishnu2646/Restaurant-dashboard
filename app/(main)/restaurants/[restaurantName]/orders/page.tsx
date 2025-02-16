import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusIcon, Search } from 'lucide-react';
import React from 'react';
import OrderCard from './components/orderCard';

const Page = () => {
    return (
        <div className="flex flex-col gap-4 p-5">
            {/* Left section (Order Cards) */}
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                    <div className="flex items-center gap-4 md:mt-0 mt-5">
                        <Input type="text" placeholder="Search by name..." className="w-full sm:w-auto">
                            <Search width={15} height={15} className="text-input" />
                        </Input>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button>
                        <PlusIcon />
                        New Order
                    </Button>
                </div>

                {/* Flex container for Order Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>
            </div>
        </div>
    );
};

export default Page;
