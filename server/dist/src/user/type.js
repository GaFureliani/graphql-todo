"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const nexus_1 = require("nexus");
exports.user = (0, nexus_1.objectType)({
    name: 'User',
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("username");
        // t.nonNull.field("todos", {
        //     type: "Todo"
        // })
    }
});
