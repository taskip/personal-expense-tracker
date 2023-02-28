import { NextFunction, Request, Response } from "express";

export function sessionCheck(req: Request, res: Response, next: NextFunction): void {
    if (req.path as string !== '/api/auth/login' && 
        req.path as string !== '/api/user/add' &&
        !req.session.user?.username && 
        !req.session.user?.id) {
        console.log('Unauthorized');
        return next(new Error('Unauthorized')); 
    }
    next();    
}