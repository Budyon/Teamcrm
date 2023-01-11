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
exports.companyRouter = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const companySchema_1 = require("../schema/companySchema");
// createRole()
const router = express_1.default.Router();
exports.companyRouter = router;
router.use((0, body_parser_1.json)());
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, logo, description, address, webpage, phonenumber } = req.body;
        const company = yield companySchema_1.Company.create({
            name,
            logo,
            description,
            address,
            webpage,
            phonenumber
        });
        if (company) {
            res.json(company);
        }
    }
    catch (error) {
        console.log(error);
    }
}));
