import { User } from "generated/prisma";
import { Types } from "mongoose";

export interface JwtPayloadInterface {
    id: User['id']
}