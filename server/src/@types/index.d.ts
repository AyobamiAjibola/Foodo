declare namespace Express {
    export interface Request {
        user: string;
        admin: boolean;
        role: string;
        vendorStatus: boolean;
        vendorId: string;
        userEmail: string;
        rider: string;
        isRider: boolean;
    }
}