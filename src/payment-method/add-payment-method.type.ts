import { PaymentMethod } from "../entity/PaymentMethod";

export type AddPaymentMethod = Omit<PaymentMethod, 'id'>;