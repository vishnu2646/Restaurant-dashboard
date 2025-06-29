'use client';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getRestaurantEmployee } from '@/actions/restaurant';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IEmploye, IRestaurant } from '@/types/types';

interface EmployeeProps {
    restaurant: IRestaurant;
}

const Employees: React.FC<EmployeeProps> = ({restaurant}: EmployeeProps) => {

    const [employees, setEmployees] = useState<IEmploye[]>([]);

    const [error, setError] = useState<string>();

    const fetchRestaurantEmployee = async () => {
        const data = await getRestaurantEmployee(restaurant.id.toString(), 4);
        if(data && data.success) {
            setEmployees(data.success as any);
        } else if(data && data.error) {
            setError('');
        }
    }

    useEffect(() => {
        fetchRestaurantEmployee();
    }, []);

    return (
        <div className='hidden sm:block'>
            <div className='flex items-center justify-between pb-2'>
                <h1 className='font-bold text-medium'>Employees</h1>
                <Link href={`/employees?restaurantId=${restaurant.id}`}>
                    <Button variant="link">
                        View All
                    </Button>
                </Link>
            </div>
            <Card className='shadow-none'>
                <CardContent className='flex flex-col gap-10 pt-5'>
                    {employees && employees.length === 0 && (
                        <div className='flex items-start gap-2'>
                            <h4>No Employees to display</h4>
                        </div>
                    )}
                    {employees && employees.map(employee => (
                        <div className='flex items-start gap-2' key={employee.id}>
                            <UserCircle width={30} height={30} className='text-input' />
                            <div>
                                <h4 className='font-semibold text-sm'>{employee.name}</h4>
                                <h6 className='font-light text-xs text-input'>{employee.position}</h6>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default Employees
