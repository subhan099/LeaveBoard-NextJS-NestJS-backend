import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompanyService {
  constructor(
    private userService: UserService,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, userId: number) {
    let company: Company = new Company();
    company.name = createCompanyDto.name;
    company.category = createCompanyDto.category;
    company.user = await this.userService.findUserByID(userId);
    const create = await this.companyRepository.save(company);
    return { message: 'company created', status: 'success', data: { create } };
    // return 'company created';
  }

  // async create(
  //   createCompanyDto: CreateCompanyDto,
  //   userId: number,
  // ): Promise<Company> {
  //   const newCompany = new Company();
  //   newCompany.name = createCompanyDto.name;
  //   newCompany.category = createCompanyDto.category;
  //   // newCompany.image = createCompanyDto.image;
  //   newCompany.user = await this.userService.findUserByID(userId);

  //   const createdCompany = await this.companyRepository.save(newCompany);
  //   return createdCompany;
  //   // return 'This action adds a new company';
  // }

  // async createCompany(
  //   createCompanyDto: CreateCompanyDto,
  //   image: Buffer,
  // ): Promise<Company> {
  //   // Create a new 'Company' entity and populate it with data from the DTO
  //   const newCompany = new Company();
  //   newCompany.name = createCompanyDto.name;
  //   newCompany.category = createCompanyDto.category;

  //   // Set the image data
  //   // newCompany.image = image;

  //   // Save the new company to the database
  //   const createdCompany = await this.companyRepository.save(newCompany);

  //   return createdCompany;
  // }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
