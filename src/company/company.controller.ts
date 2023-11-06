import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

interface CustomRequest extends Request {
  user: {
    userId: number;
  };
}

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  create(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    @Req() request: CustomRequest,
  ) {
    const userId = request.user.userId;
    // console.log(userId);
    return this.companyService.create(createCompanyDto, userId);
    return 'created';
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
