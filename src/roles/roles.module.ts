import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from 'src/permissions/Schema/permission.schema';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
