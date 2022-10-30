"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo_type = void 0;
const nexus_1 = require("nexus");
exports.todo_type = (0, nexus_1.objectType)({
    name: 'Todo',
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("description");
        t.nonNull.string("target_date");
        t.nonNull.boolean("done");
        t.nonNull.string("created_at");
        t.nonNull.string("updated_at");
        // t.nonNull.field("author", {
        //     type: 'User'
        // })         
    }
});
