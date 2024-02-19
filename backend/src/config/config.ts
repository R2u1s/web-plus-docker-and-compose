/* import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Offer } from '../offers/entities/offer.entity';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'student',
  password: 'student',
  database: 'kupipodariday',
  entities: [Offer, User, Wish, Wishlist],
  synchronize: true,
}; */

// Эта логика взята из вебинара `QA вебинар NEST`
export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3001
  },
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USERNAME || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    name: process.env.POSTGRES_NAME || 'kupipodariday'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt_secret'
  }
})
