/**
 * Note that this MUST conform to the prompt in prompts.ts, but I don't think there's a way
 * to enforce that in TypeScript.
 */
export interface PlaceOrderOrderItem {
    name: string;
    quantity: number;
}
