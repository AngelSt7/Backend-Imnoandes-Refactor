import { Property } from "generated/prisma"

export interface CreatePropertyDB extends Omit<Property, 'id'> { }