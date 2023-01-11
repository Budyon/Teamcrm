"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const auth_1 = require("./routes/auth");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const endpoints_config_1 = __importDefault(require("../endpoints.config"));
const util_1 = require("../util");
const user_1 = require("./routes/user");
const company_1 = require("./routes/company");
const app = (0, express_1.default)();
const db = "mongodb://localhost:27017/teamcrm";
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: endpoints_config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use((0, body_parser_1.json)());
console.log("Asa");
app.use(auth_1.AuthRouter);
app.use("/api/v1/auth", auth_1.AuthRouter);
app.use("/api/v1/user", util_1.auth, user_1.userRouter);
app.use('/api/v1/company', util_1.auth, company_1.companyRouter);
dotenv.config();
app.listen(endpoints_config_1.default.PORT, () => { console.log(`Application started on port ${3004}`); });
mongoose_1.default.connect(db).then(() => console.log('connected to db..')).catch((err) => {
    console.log(err + 'error');
});
