import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    passwd: string;

    @Column({nullable: true})
    firstName?: string;

    @Column({nullable: true})
    lastName?: string;

    @Column({nullable: true})
    age?: number;


}
