import { User } from "generated/prisma";

export interface JwtPayloadInterface {
    id: User['id'],
    exp?: number
}