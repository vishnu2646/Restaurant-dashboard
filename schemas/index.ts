import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter your email"
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string()),
});

export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Please enter your email"
    }),
    name: z.string().min(1, {
        message: "Please enter your name"
    }),
    password: z.string().min(6, {
        message: "Password should be at least 6 characters"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Please enter your email",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password should be at least 6 characters",
    }),
});

export const accountSchema = z.object({
    name: z.string().min(1, {
        message: "Please enter your name",
    }),
    email: z.string().email({
        message: "Please enter your email"
    }),
    twoFactor: z.boolean().default(false),
    phone: z.string().optional(),
    image: z.string().default('/user.png'),
});

export const updatePasswordSchema = z.object({
    oldPassword: z.string().min(6, {
        message: "Please enter your old password",
    }),
    newPassword: z.string().min(6, {
        message: "Please enter your new password",
    }),
    reNewPassword: z.string().min(6, {
        message: "Please re enter your new password",
    }),
});

export const restaurantSchema = z.object({
    name: z.string().min(1, {
        message: "Please enter Restaurant Name",
    }),
    rating: z.string().min(1, {
        message: "Please enter Restaurant rating",
    }).default('0'),
    address: z.string().min(1, {
        message: "Please enter Address",
    }),
    empCount: z.string().min(1, {
        message: "Please enter Employee Number",
    }).default('0'),
    image: z.string().min(1, {
        message: "Please add image to the restaurant"
    }),
});

export const menuItemSchema = z.object({
    name: z.string().min(1, {
        message: 'Please add the restaurant name'
    }),
    price: z.string().min(1, {
        message: 'Please add the restaurant price'
    }),
    description: z.string().min(1, {
        message: 'Please add the restaurant description'
    }),
    image: z.string().min(1, {
        message: 'Please add the restaurant image'
    }),
});

export const employeeSchema = z.object({
    name: z.string().min(1, {
        message: 'Please add the employee name'
    }),
    position: z.string().min(1, {
        message: 'Please add the employee position'
    }),
    image: z.string().min(1, {
        message: 'Please add the employee image'
    }),
    restaurantId: z.string().min(1, {
        message: 'Please select the restaurant'
    }),
});