import {Request, Response} from 'express';
import db from '../../sequelize/models'

const Category = db.Category;
const Cuisines = db.Cuisines;
const Role = db.AdminRole;

//CATEGORY
//create category
const createCategory = async (req: Request, res: Response) => {
    try {
        const saveCategory = await Category.create(req.body)
        res.json({
            error: [],
            data: {
                saveCategory
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

//get all category
const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findAll();
        res.json({
            error: [],
            data: {
                category
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

//END CATEGORY

//CUISINES
//create cuisines
const createCuisines = async (req: Request, res: Response) => {
    try {
        const saveCuisines = await Cuisines.create(req.body)
        res.json({
            error: [],
            data: {
                saveCuisines
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

//get all cuisines
const getCuisines = async (req: Request, res: Response) => {
    try {
        const cuisines = await Cuisines.findAll();
        res.json({
            error: [],
            data: {
                cuisines
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

//END CUISINES

// ADMIN ROLE
// create roles
const createRole = async (req: Request, res: Response) => {
    try {
        const saveRoles = await Role.create(req.body)
        res.json({
            error: [],
            data: {
                saveRoles
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

// get all roles
const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.findAll();
        res.json({
            error: [],
            data: {
                roles
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}

//END ADMIN ROLE

export default {
    createCategory,
    createCuisines,
    createRole,
    getRoles,
    getCategory,
    getCuisines
}