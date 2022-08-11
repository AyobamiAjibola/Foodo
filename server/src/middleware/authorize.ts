import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken'

export const authorize = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("token");
    if(!token){
        return res.status(403).json({
            errors: [
                {
                    msg:"Invalid Token"
                }
            ]
        })
    }

    try {
        const data = JWT.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            user: string,
            admin: boolean,
            role: string,
            vendorStatus: boolean,
            vendorId: string,
            userEmail: string,
            rider: string,
            isRider: boolean
        };
        req.user = data.user;
        req.admin = data.admin;
        req.role = data.role;
        req.vendorStatus = data.vendorStatus;
        req.vendorId = data.vendorId;
        req.userEmail = data.userEmail;
        req.rider = data.rider;
        req.isRider = data.isRider;
        next()
    } catch (error: any) {
        return res.status(403).json({
            errors: [
                {
                    msg:"Unauthorized"
                }
            ]
        })
    }
};

export const authorizeandverification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    authorize(req, res, () => {
        if (req.user === req.params.id || req.admin === true) {
            next();
          } else {
            res.status(403).json("You are not allowed to do that!");
          }
    })
};

export const super_admin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    authorize(req, res, () => {
        if (req.user && req.admin === true && req.role === 'super_admin') {
            next();
          } else {
            res.status(403).json("You are not allowed to do that!");
          }
    })
};

//MUST BE AUTHORIZE AND USER TYPE MUST BE USER
export const authorizeuser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    authorize(req, res, () => {
        if (req.user && req.admin === true && req.role !== 'super_admin' ) {
            next();
          } else {
            res.status(403).json("You are not allowed to do that!");
          }
    })
};


