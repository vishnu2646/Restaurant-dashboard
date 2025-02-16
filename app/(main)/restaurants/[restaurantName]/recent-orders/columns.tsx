"use client";

import { ColumnDef } from '@tanstack/react-table';

export type IOrderItem = {
    itemId: string;
    itemName: string;
    price: string;
    quantity: number;
}

export type IOrder = {
    orderId: string;
    table: number;
    customer: string;
    description: string;
    price: string;
    status: "pending" | "completed" | "error";
}

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "orderId",
        header: "Order Id",
    },
    {
        accessorKey: "table",
        header: "Table",
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "status",
        header: "Status"
    }
];