import { User } from "generated/prisma";

export interface JwtUser extends Partial<User> {
    exp: number | undefined;
}