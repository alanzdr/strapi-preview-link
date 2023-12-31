"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const routes_1 = __importDefault(require("./routes"));
exports.default = {
    async register({ strapi }) { },
    async bootstrap({ strapi }) { },
    config: {
        default: {},
        validator() { },
    },
    controllers: controllers_1.default,
    routes: routes_1.default,
};
