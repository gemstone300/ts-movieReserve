import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Show } from 'src/show/entities/show.entity';

@Index('seatId', ['seatId'], { unique: true })
@Entity({
  name: 'seat',
})

export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number; 

  @Column({ type: 'bigint', nullable: false })
  seatNumber: number;

  @Column({ type: 'bigint', nullable: false })
  seatPrice: number;

  @Column({ type: 'boolean', nullable: false, default:true })
  seatAvailable: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Show, (show) => show.seat)
  @JoinColumn([{ name: 'showId', referencedColumnName:'showId'  }])
  show: Show;

  @Column({ type: 'bigint',name:'showId', nullable: false })
  showId: number;

  @ManyToOne(() => Reservation, (reseravation) => reseravation.seat)
  @JoinColumn([{ name: 'reserveId',referencedColumnName: 'reserveId' }])
  reservation: Reservation;

  @Column({ type: 'bigint',name: 'reserveId', nullable: true })
  reserveId: number;

}