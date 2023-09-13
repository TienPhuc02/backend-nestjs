import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, ResumeSchema } from './Schema/resumes.schema';
import { CompaniesService } from 'src/companies/companies.service';

import { CompaniesModule } from 'src/companies/companies.module';

import { Company, CompanySchema } from 'src/companies/schema/company.schema';
import { Job, JobSchema } from 'src/jobs/Schema/job.schema';
import { JobsService } from 'src/jobs/jobs.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService, JobsService, CompaniesService],
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    JobsModule,
    CompaniesModule,
  ],
})
export class ResumesModule {}
