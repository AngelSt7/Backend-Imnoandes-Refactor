import { BadRequestException, createParamDecorator, ExecutionContext, Logger } from "@nestjs/common";

export const Header = (name: string, validatorFn: (value: any) => boolean) =>

    createParamDecorator((data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const headerValue = request.headers[name.toLowerCase()];
        if (!headerValue || !validatorFn(headerValue)) {
            throw new BadRequestException(`Invalid or missing ${name} header`);
        }

        return headerValue;
    })();
