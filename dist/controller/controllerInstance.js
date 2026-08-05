"use strict";
// src/controller/controllerInstance.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const cartasController_1 = __importDefault(require("./cartasController"));
exports.controller = new cartasController_1.default();
