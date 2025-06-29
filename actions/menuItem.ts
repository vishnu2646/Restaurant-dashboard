'use server';
import { prisma } from "@/lib/prisma";
import { menuItemSchema } from "@/schemas";
import { IMenuProps } from "@/types/types";
import * as z from 'zod';

export const createItem = async (values: z.infer<typeof menuItemSchema>) => {
    const validatedFields = menuItemSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid Fields" };
    }

    const { name, price, description, image } = validatedFields.data;

    try {
        await prisma.menuItem.create({
            data: {
                name,
                description,
                image,
                price,
            }
        });
        return { success: 'Menu Item Created successfully.' };
    } catch (error) {
        console.log(error);
        return { error: 'Failed to create a Menu item.' };
    }
}

export const getItems = async () => {
    try {
        const menuItems = await prisma.menuItem.findMany();
        return {success: menuItems};
    } catch (error) {
        console.error(error);
        return { error: 'Failed to get menu items.' };
    }
}

export const createRestaurantMenu = async (items: IMenuProps[], restaurantId: string) => {

    if(items.length === 0) {
        return { error: 'No Items to add to the menu list' };
    }

    try {
        for(const item of items) {
            await prisma.menu.create({
                data: {
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    restaurantId: restaurantId
                }
            });
        }
        return { success: 'Items has been added to the Menu List' }
    } catch (error) {
        console.error(error);
        return { error: 'Failed to create menu' };
    }
}

export const getRestaurantMenus = async (restaurantId: string) => {
    try {
        const menus = await prisma.menu.findMany({
            where: {
                restaurantId: restaurantId
            }
        });
        return { success: menus };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to retrieve restaurant menus' };
    }
}

export const deleteRestaurantMenuItem = async (menuId: string, restaurantId: string) => {
    try {
        await prisma.menu.delete({
            where: {
                id: menuId,
                restaurantId: restaurantId
            }
        });
        return { success: 'Menu Item has been deleted successfully' };
    } catch (error) {
        console.log(error);
        return { error: 'Something went wrong' };
    }
}