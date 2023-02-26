import { NextFunction, Request, Response } from "express";

export function sessionCheck(req: Request, res: Response, next: NextFunction): void {
    console.log('Got to session check..: ' + req.path);
    console.log(req.session.user?.username);
    if (req.path as string !== '/login' || 
        req.path as string !== '/user/add' ||
        !req.session.user?.username || 
        !req.session.user?.id) {
        console.log('Unauthorized');
        /*
        res.status(401).json({
            error: new Error('Not authorized'),
        });
        */
    }
    //console.log('Login or session ok ..' + req.session?.user?.id);
    next();    
}