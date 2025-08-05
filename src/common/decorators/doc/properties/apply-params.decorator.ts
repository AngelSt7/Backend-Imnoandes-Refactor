import { applyDecorators } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";

export enum TypesParams {
    string = 'string',
    number = 'number',
    boolean = 'boolean'
}

export const ApplyParams = (
    name: string,
    required: boolean = true,
    type: TypesParams,
    description: string = 'Car ID',
    example: string = '686b3e3974b3f83e4d336ad8'
) =>
    applyDecorators(
       ApiParam({ name, required, type, description, example })
    );
