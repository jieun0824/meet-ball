import { User } from "next-auth";

export function filterUserId(user: User) {
    if (user.id) {
        delete user.id;
    }
}