export enum UserRole {
    ADMIN='ADMIN',
    SALESMAN='SALESMAN',
    STORE='STORE',
    ALL= 'ALL'
}
export interface User {
    id: number,
    name: string,
    email: string,
    avatar: string,
    language: string,
    role: UserRole,
    phone: string,
    address: string,
    isActive: boolean,
    count: Number,
    promotions?: Promotion[],
    customers?: Customer[],
    stores?: User[],
    salesman?: User,
    createdAt: Date,
    updatedAt: Date,
}
export interface Promotion {
    id: number,
    title: string,
    description: string,
    user: User,
    createdAt: Date,
    updatedAt: Date,
}
export interface Customer {
    id: number,
    full_name: string,
    phone: string,
    store: User,
    createdAt: Date,
    updatedAt: Date,
}
export interface Meta {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
}
export interface UserPagination {
    items: User[],
    meta: Meta,
};
export interface PromotionPagination {
    items: Promotion[],
    meta: Meta,
};
export interface CustomerPagination {
    items: Customer[],
    meta: Meta,
};

export interface SideUserProps {
    open: boolean,
    user: User | undefined,
    role: UserRole,
}