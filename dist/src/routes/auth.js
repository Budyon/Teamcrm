"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const userSchema_1 = require("../schema/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("../../util");
const router = express_1.default.Router();
exports.AuthRouter = router;
router.use((0, body_parser_1.json)());
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
        const oldUser = yield userSchema_1.User.findOne({ email });
        if (oldUser) {
            return res.status(409).json("User Already Exist. Please Login");
        }
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userSchema_1.User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        res.status(201).send(user);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = yield userSchema_1.User.findOne({ email });
        if (!!user) {
            const token = (0, util_1.generateAccessToken)({ user_id: user.id });
            res.status(400).json({
                user,
                token,
            });
        }
        else {
            res.status(403).json({ error: "User not defined" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
