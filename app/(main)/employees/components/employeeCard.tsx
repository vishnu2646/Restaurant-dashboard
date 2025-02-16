import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IEmploye } from '@/types/types'
import React from 'react'

interface IEmployeProps {
    emp: IEmploye
}

const EmployeeCard: React.FC<IEmployeProps> = ({emp}) => {
    return (
        <>
            <Card className='shadow-none p-0'>
                <CardHeader>
                    <img alt='employe' src={emp.image} className='w-full rounded h-[100px]'/>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between flex-col'>
                        <span className='font-semibold text-lg truncate w-[100px] text-center'>{emp.name}</span>
                        <span className='text-inputDark text-sm'>{emp.position}</span>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default EmployeeCard
