"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const router = express_1.default.Router();
exports.userRouter = router;
router.use((0, body_parser_1.json)());
router.post("/aaa", (req, res) => {
    res.json({
        asas: "asas"
    });
});
