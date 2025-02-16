import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import React from 'react'
import EmployeeCard from './components/employeeCard'
import { employee } from '@/data/data'

const Page: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <Input type="text" placeholder="Search by name...">
                    <Search width={15} height={15} className="text-input" />
                </Input>
                <Button className="md:mt-0 mt-5">
                    <Plus width={20} height={20} />
                    Add Employees
                </Button>
            </div>
            <div className='flex items-center gap-4 flex-wrap'>
                {employee.map((emp, index) => (
                    <EmployeeCard emp={emp} key={index} />
                ))}
            </div>
        </>
    )
}

export default Page
