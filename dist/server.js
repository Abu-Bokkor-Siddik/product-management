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
const app_1 = __importDefault(require("./app"));
// import config from "./app/config";
const mongoose_1 = __importDefault(require("mongoose"));
// 
// console.log(config.port,'port is define');
// console.log(process.env.PORT)
// console.log(process.env.DATABASE_URL)
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://product_management:apnsNjAAVkHFaRYc@cluster0.kkqbu90.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            app_1.default.listen(3000, () => {
                console.log(`Example app listening on port ${3000}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
