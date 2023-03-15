import { Router } from "express";

export abstract class ControllerBase {
    public name: string;
    public path: string;
    
    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }

    abstract getRouter(): Router;
    abstract getPath(): string;

}