import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import { jwtGen, jwtGenerator, jwtRider, jwtUser } from '../../utils/jwtGenerator';
import db from '../../sequelize/models';

const otherAdm = db.OtherAdmins;
const superAdm = db.SuperAdmin;
const Vendor = db.Merchant;
const User = db.User;
const Rider = db.Rider;
const sequelize = db.sequelize;

//============================================= ADMIN ========================================//
const register = async (req: Request, res: Response) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        if(req.body.role === 'super_admin'){
            const {
                companyName,
                fullName,
                phonenumber,
                email,
                role,
                password
            } = req.body;

            const user = await superAdm.findOne({where: {email}}, { transaction });
            if(user){
                return res.json({
                    errors:[
                        {
                            msg: "Email already in use"
                        }
                    ],
                    data: null,
                })
            }

            const newUser = await superAdm.create({
                companyName,
                fullName,
                phonenumber,
                email,
                role,
                password
            }, { transaction });

            await transaction.commit();
            const token = jwtGenerator(
                newUser.id,
                newUser.isAdmin,
                newUser.role
                );
            res.json({
                error: [],
                data: {
                    token
                }
            });
        } else {
            const {
                firstname,
                lastname,
                phonenumber,
                email,
                role,
                password
            } = req.body;

            const superAdminId = req.user;

            const user = await otherAdm.findOne({where: {email}}, { transaction });
            if(user){
                return res.json({
                    errors:[
                        {
                            msg: "Email already in use"
                        }
                    ],
                    data: null,
                })
            }

            const newUser = await otherAdm.create({
                firstname,
                lastname,
                phonenumber,
                email,
                superAdminId,
                role,
                password
            }, { transaction });

            await transaction.commit();
            const token = jwtGenerator(
                newUser.id,
                newUser.isAdmin,
                newUser.role
                );
            res.json({
                error: [],
                data: {
                    token
                }
            })
        }
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
}

const SA_login = async (req: Request, res: Response) => {

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { email, password } = req.body
        const user = await superAdm.findOne({where: {email}}, { transaction });
        if(!user) {
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential email"
                    }
                ],
                data: null
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential password"
                    }
                ],
                data: null
            })
        }

        await transaction.commit();
        const token =
            jwtGenerator(
                user.id,
                user.isAdmin,
                user.role
            );
        res.json({
            errors: [],
            data: {
                token,
                user: {
                    email: user.email
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
}

const login = async (req: Request, res: Response) => {

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { email, password } = req.body
        const user = await otherAdm.findOne({where: {email}}, { transaction });
        if(!user) {
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential email"
                    }
                ],
                data: null
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential password"
                    }
                ],
                data: null
            })
        }

        await transaction.commit();
        const token =
            jwtGenerator(
                user.id,
                user.isAdmin,
                user.role
            );
        res.json({
            errors: [],
            data: {
                token,
                user: {
                    email: user.email
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};
//============================================ END ADMIN ================================//

//============================================= VENDOR ==================================//
const vendorReg = async (req: Request, res: Response) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const {
            fullname,
            email,
            password,
            noOfEstablishment,
            addressOfStore,
            whereYouDeliver,
            businessType,
            cuisinesDelivered,
            closingTime,
            openingTime,
            profileImage,
            certificate
        } = req.body

        const shortCode = (str_len: any) => {
            let random_str = '';
            const char = fullname.replace(' ', '') + email.replace('@gmail.com' || '@yahoo.com', '') + Date.now();
            for(let i = 0; i < str_len; i++){
                random_str += char.charAt(Math.floor(Math.random() * char.length))
            }
            return random_str;
        }
        const vendorId = shortCode(6).toUpperCase();

        const user = await Vendor.findOne({where: {email}}, { transaction });
        if(user){
            return res.json({
                errors:[
                    {
                        msg: "Email already in use"
                    }
                ],
                data: null,
            })
        }

        const newVendor = await Vendor.create({
            fullname,
            email,
            password,
            noOfEstablishment,
            addressOfStore,
            whereYouDeliver,
            businessType,
            cuisinesDelivered,
            vendorId,
            closingTime,
            openingTime,
            profileImage,
            certificate
        }, { transaction });

        await transaction.commit();
        const token =
            jwtGen(
                newVendor.id,
                newVendor.vendorId,
                newVendor.isVendor
            );
        res.json({
            error: [],
            data: {
                token
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};

const vendorLogin = async (req: Request, res: Response) => {

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { email, password } = req.body
        const vendor = await Vendor.findOne({where: {email}}, { transaction });
        if(!vendor) {
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential email"
                    }
                ],
                data: null
            })
        }

        const isMatch = await bcrypt.compare(password, vendor.password);
        if(!isMatch){
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential password"
                    }
                ],
                data: null
            })
        }

        await transaction.commit();
        const token =
            jwtGen(
                vendor.id,
                vendor.vendorId,
                vendor.isVendor
            );
        res.json({
            errors: [],
            data: {
                token,
                user: {
                    email: vendor.email
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};
//========================================= END VENDOR =================================//

//=========================================== USER =====================================//
const userReg = async (req: Request, res: Response) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const {
            firstname,
            lastname,
            email,
            password,
            phonenumber,
            refered
        } = req.body

        const shortCode = (str_len: any) => {
            let random_str = '';
            const char = firstname + email.replace('@gmail.com' || '@yahoo.com', '') + Date.now();
            for(let i = 0; i < str_len; i++){
                random_str += char.charAt(Math.floor(Math.random() * char.length))
            }
            return random_str;
        }
        const refererCode = shortCode(6).toUpperCase();

        const user = await User.findOne({where: {email}}, { transaction });
        if(user){
            return res.json({
                errors:[
                    {
                        msg: "Email already in use"
                    }
                ],
                data: null,
            })
        }

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password,
            phonenumber,
            refererCode,
            refered
        }, { transaction });

        await transaction.commit();
        const token =
            jwtUser(
                newUser.id,
                newUser.email
            );
        res.json({
            error: [],
            data: {
                token
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};

const userLogin = async (req: Request, res: Response) => {

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { email, password } = req.body
        const user = await User.findOne({where: {email}}, { transaction });
        if(!user) {
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential email"
                    }
                ],
                data: null
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential password"
                    }
                ],
                data: null
            })
        }

        await transaction.commit();
        const token =
            jwtUser(
                user.id,
                user.email
            );
        res.json({
            errors: [],
            data: {
                token,
                user: {
                    email: user.email
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};
//===================================== END USER ============================//

//================================== RIDER =================================//
const riderReg = async (req: Request, res: Response) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const {
            firstname,
            lastname,
            email,
            password,
            phonenumber
        } = req.body

        const rider = await Rider.findOne({where: {email}}, { transaction });
        if(rider){
            return res.json({
                errors:[
                    {
                        msg: "Email already in use"
                    }
                ],
                data: null,
            })
        }

        const newRider = await Rider.create({
            firstname,
            lastname,
            email,
            password,
            phonenumber
        }, { transaction });

        await transaction.commit();
        const token =
            jwtRider(
                newRider.id,
                newRider.email,
                newRider.isAvailable
            );
        res.json({
            error: [],
            data: {
                token
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};

const riderLogin = async (req: Request, res: Response) => {

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const { email, password } = req.body
        const rider = await Rider.findOne({where: {email}}, { transaction });
        if(!rider) {
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential email"
                    }
                ],
                data: null
            })
        }

        const isMatch = await bcrypt.compare(password, rider.password);
        if(!isMatch){
            return res.json({
                errors: [
                    {
                        msg: "Invalid Credential password"
                    }
                ],
                data: null
            })
        }

        await transaction.commit();
        const token =
            jwtRider(
                rider.id,
                rider.email,
                rider.isAvailable
            );
        res.json({
            errors: [],
            data: {
                token,
                user: {
                    email: rider.email
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message);
        if(transaction) {
            await transaction.rollback();
        }
    }
};
//============================== END RIDER ======================================//

//==================================== VERIFY =================================//
const verify = async (req: Request, res: Response) => {
    try {
        if(req.role === 'super_admin') {
            const user = await superAdm.findOne
                ({where: { id: req.user, isAdmin: req.admin, role: req.role }});

            return res.json({
                errors: [],
                data: {
                    user: {
                        id: user.id,
                        isAdmin: user.isAdmin,
                        role: user.role
                    }
                }
            });
        } else {
            const user = await otherAdm.findOne({
                where: { id: req.user, isAdmin: req.admin, role: req.role }});

            return res.json({
                errors: [],
                data: {
                    user: {
                        id: user.id,
                        isAdmin: user.isAdmin,
                        role: user.role
                    }
                }
            });
        }
    } catch (error: any) {
        res.status(400).send(error.message)
    }
};

const verifyVendor = async (req: Request, res: Response) => {
    try {
        const vendor = await Vendor.findOne
            ({where: { id: req.user, isVendor: req.vendorStatus, vendorId: req.vendorId }});

        return res.json({
            errors: [],
            data: {
                user: {
                    id: vendor.id,
                    isVendor: vendor.isVendor,
                    vendorId: vendor.vendorId
                }
            }
        });
    } catch (error: any) {
        res.send(error.message)
    }
};

const verifyUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne
            ({where: { id: req.user, email: req.userEmail }});

        return res.json({
            errors: [],
            data: {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message)
    }
};

const verifyRider = async (req: Request, res: Response) => {
    try {
        const rider = await Rider.findOne
            ({where: { id: req.user, email: req.rider, isAvailable: req.isRider }});

        return res.json({
            errors: [],
            data: {
                user: {
                    id: rider.id,
                    email: rider.email,
                    isAvailable: rider.isAvailable
                }
            }
        });
    } catch (error: any) {
        res.status(400).send(error.message)
    }
};

export default {
    login,
    register,
    verify,
    SA_login,
    vendorReg,
    vendorLogin,
    verifyVendor,
    userReg,
    userLogin,
    verifyUser,
    riderReg,
    riderLogin,
    verifyRider
}