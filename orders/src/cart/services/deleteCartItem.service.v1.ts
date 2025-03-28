import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns";
import { User } from "@src/commons/user";
import { deleteCartItemByProductId } from "../dao/deleteCartItemByProductId.dao";

export const deleteCartItemServiceV1 = async (
    user: User,
    product_id: string,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Tenant ID not found').generate();
        }

        if (!user.id) {
            return new NotFoundResponse('User not found').generate();
        }

        const cart = await deleteCartItemByProductId(SERVER_TENANT_ID, user.id, product_id);

        return {
            data: {},
            status: 204,
        }
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}