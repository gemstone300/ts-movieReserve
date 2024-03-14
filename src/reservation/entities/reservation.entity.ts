import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Seat } from './seat.entity';
import { Show } from 'src/show/entities/show.entity';

@Index('reserveId', ['reserveId'], { unique: true })
@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  reserveId: number; 

  @Column({ type: 'bigint', nullable: false })
  reservationPrice: number;

  @Column({ type: 'bigint', nullable: false })
  reservationQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
 
  
  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'bigint', name: 'userId' })
  userId: number;

  @ManyToOne(() => Show, (show) => show.reservation)
  @JoinColumn({ name: 'showId' })
  show: Show;

  @Column({ type: 'bigint', name: 'showId' })
  showId: number;

  @OneToMany(() => Seat, (seat) => seat.reservation)
  seat: Seat[];

  @Column({ type: 'bigint', name: 'seatId',nullable: false })
  seatId: number;

}