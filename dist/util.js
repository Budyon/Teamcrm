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
exports.auth = exports.SECRET_KEY = exports.generateAccessToken = exports.createRole = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const endpoints_config_1 = __importDefault(require("./endpoints.config"));
const roleSchema_1 = require("./src/schema/roleSchema");
function createRole() {
    const arr = ["Product manager", "Company owner", "Project manager", "Executive manager"];
    arr.forEach((element) => __awaiter(this, void 0, void 0, function* () {
        yield roleSchema_1.Role.create({
            name: element
        });
    }));
}
exports.createRole = createRole;
function generateAccessToken(user) {
    return (0, jsonwebtoken_1.sign)(user, endpoints_config_1.default.TOKEN, { expiresIn: '1800s' });
}
exports.generateAccessToken = generateAccessToken;
exports.SECRET_KEY = endpoints_config_1.default.TOKEN;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, exports.SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
});
exports.auth = auth;
