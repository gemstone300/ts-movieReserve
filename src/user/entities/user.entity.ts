import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../types/userRole.type';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number; 

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  nickName: string;

  @Column({ type: 'bigint', nullable: false, default:1000000 })
  point: number;

  @Column({ type: 'boolean', nullable: false, default:false })
  isAdmin: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

}