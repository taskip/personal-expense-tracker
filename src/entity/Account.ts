import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    balance: number;

    @Column({nullable: true})
    limit?: number;

    @Column()
    balanceType: string;

}