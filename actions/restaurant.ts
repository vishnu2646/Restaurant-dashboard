'use server';

import * as z from 'zod';
import { employeeSchema, restaurantSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';

export const createRestaurant = async (restaurant: z.infer<typeof restaurantSchema>) => {
    const validateFields = restaurantSchema.safeParse(restaurant);

    if(validateFields.error) {
        return { error: 'Invalid restaurant creation' };
    }

    const { name, rating, address, image, empCount } = validateFields.data;

    try {
        await prisma.restaurant.create({
            data: {
                name,
                rating,
                address,
                image,
                empCount: parseInt(empCount)
            }
        });
        return { success: 'Restaurant creaetd successfully' }
    } catch (error) {
        console.log(error);
        return { error: 'somethings went wrong' };
    }
}

export const getRestaurants = async() => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        return {success: restaurants};
    } catch (error) {
        console.log(error);
        return { error: 'somethings went wrong' };
    }
}

export const getRestaurantByName = async(restaurantName: string): Promise<any> => {
    try {
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                name: restaurantName
            }
        });
        return { succeess: restaurant };
    } catch (error) {
        console.log(error);
        return { error: 'Invalid restaurant Id' };
    }
}

export const getRestaurantEmployee = async (restaurantId: string, limit?: number) => {
    try {
        const employees = await prisma.employee.findMany({
            where: {
                restaurantId: restaurantId
            },
            take: limit
        });
        return { success: employees };
    } catch (error) {
        console.log(error);
        return { error: 'Invalid restaurant' };
    }
}

export const createRestaurantEmployee = async (restaurantEmp: z.infer<typeof employeeSchema>) => {
    const validateFields = employeeSchema.safeParse(restaurantEmp);

    if(!validateFields.success) {
        return { error: 'Invalid Fields' };
    }

    const { name, image, position, restaurantId } = validateFields.data;

    try {
        await prisma.employee.create({
            data: {
                name,
                position,
                image,
                restaurantId
            }
        })
        return { success: 'Employee created successfully.' };
    } catch (error) {
        console.error(error);
        return { error: 'Invalid employee creation.' };
    }
}

export const getEmployeeById = async (employeeId: string) => {
    try {
        const employee = await prisma.employee.findFirst({
            where: {
                id: employeeId
            },
        });
        return { success: employee };
    } catch (error) {
        console.log(error);
        return { error: 'Invalid employee Id' };
    }
}