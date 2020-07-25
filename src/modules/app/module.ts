import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';

import { OrderRepository } from './repositories/order';
import { OrderController } from './controllers/order';
import { OrderItemController } from './controllers/orderItem';
import { OrderItemRepository } from './repositories/orderItem';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, OrderController, OrderItemController],
  providers: [AuthService, UserService, UserRepository, DeviceRepository, OrderRepository, OrderItemRepository]
})
export class AppModule {}
