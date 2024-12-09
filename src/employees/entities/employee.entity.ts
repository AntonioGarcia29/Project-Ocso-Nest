import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeid: string;
    @Column('text')
    employeeName: string;
    @Column('text')
    employeeLastName: string;
    @Column('text',{
        unique:true
    })
    phoneNumber: string;
    @Column('text',{
        unique: true
    })
    employeeEmail: string;
    @Column({
        type: 'text',
        nullable: true
    })
    employeePhoto: string
    @ManyToOne(()=> Location, (location) => location.employees)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;

    @OneToOne(()=> User)
    @JoinColumn({
       name: "userId" 
    })
    user: User
}
