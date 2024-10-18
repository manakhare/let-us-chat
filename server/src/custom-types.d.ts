interface AuthUser {
    id: number,
    name: string,
    email: string 
}

//override express types
declare namespace Express {
    export interface Request {
        user?: AuthUser;
    }
}