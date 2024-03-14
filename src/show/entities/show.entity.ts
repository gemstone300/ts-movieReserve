import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../types/showCategory.type';
import { Seat } from 'src/reservation/entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Index('showId', ['showId'], { unique: true })
@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  showId: number; 

  @Column({ type: 'varchar',  nullable: false })
  title: string;

  @Column({ type: 'datetime', nullable: false })
  showTime: Date;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'enum', enum: Category, nullable: false })
  category!: Category;

  @Column({ type: 'varchar', nullable: false })
  detail: string;

  @Column({ type: 'varchar', nullable: false })
  showImage: string;

  @Column({ type: 'bigint', nullable: false })
  price: number;

  @Column({ type: 'bigint', nullable: false })
  totalSeatNum: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  
  @OneToMany(() => Seat, (seat) => seat.reservation)
  @JoinColumn({ name: 'seatId' })
  seat: Seat[];

  @Column({ type: 'bigint', nullable: false })
  seatId: number;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  @JoinColumn({ name: 'seatId' })
  reservation: Reservation[];

  @Column({ type: 'bigint', nullable: false })
  reserveId: number;
 
}