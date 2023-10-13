import models from '../models/models.js';
import ApiError from '../error/ApiError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateJWT = (id, email, role) => {
    const { sign } = jwt;
    return sign({ id, email, role}, process.env.SECRET_KEY, {expiresIn: '48h'});
}


class UserController {
    async registration(req, res, next) {
        const { email, password } = req.body;
        let { role } = req.body;
        if (!role) {
            role = 'USER';
        }
        if (!email || !password ) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }
        const candidate = await models.User.findOne({
            where: { email }
        });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует!'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await models.User.create({ email, role, password: hashPassword});
        const basket = models.Basket.create({ userId: user.id });
        const token = generateJWT(user.id, user.email, user.role);
        return res.json({token})
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await models.User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJWT(user.id, user.email, user.role);
        return res.json(token);
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role);
        return res.json({ token })
    }
}

export default new UserController();