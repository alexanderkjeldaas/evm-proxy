import {
    addMethodHandler as addMH,
    getMethodArguments,
    TxContext,
    NewTx,
} from "@coinweb/contract-kit";

type Handler = (context: TxContext, ...args: any[]) => NewTx[];

export function addMethodHandler(method: string, fn: Handler) {
    const wrapper = function (context: TxContext) {
        const [, ...methodArgs] = getMethodArguments(context);

        return fn.apply(this, [context, ...methodArgs]);
    };
    return addMH(method, wrapper);
}
