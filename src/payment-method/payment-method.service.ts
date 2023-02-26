import { PaymentMethod } from "../entity/PaymentMethod";
import { DeleteResult, Repository } from "typeorm";
import { AddPaymentMethod } from "./add-payment-method.type";

export class PaymentMethodService {
    constructor(
        private readonly paymentMethodRepository: Repository<PaymentMethod>
    ) {}

    async getById(id: string): Promise<PaymentMethod> {
        return this.paymentMethodRepository.findOneOrFail({where: {id: id}});
    }

    async getAll(): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.find();
    }

    async save(paymentMethod: AddPaymentMethod): Promise<PaymentMethod> {
        const newpaymentMethod = Object.assign(this.paymentMethodRepository.create(), paymentMethod);
        return await this.paymentMethodRepository.save(newpaymentMethod);
    }

    async update(updatedType: PaymentMethod): Promise<PaymentMethod | undefined> {
        const current = await this.paymentMethodRepository.findOneOrFail({where: {id: updatedType.id}});
        if (!current) {
            return undefined;
        }
        current.type = updatedType.type;
        current.description = updatedType.description;

        return await this.paymentMethodRepository.save(current);
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.paymentMethodRepository.delete(id);
    }
}