import { NextFunction, Request, Response} from "express";
import { validationResult } from 'express-validator';

export function requestSchema(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((error) => {
            return {
                msg: error.msg,
            };
        });
        return res.json({ errors, data: null });
    }

    next();
}