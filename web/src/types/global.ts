export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    // ... other fields
 }
 
 export type Theme = 'light' | 'dark';