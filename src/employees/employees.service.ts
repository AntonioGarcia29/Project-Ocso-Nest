import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[]= [
  {
    id: 1,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "44256856"
  },
  {
    id: 2,
    name: "Juan",
    lastName: "Costas",
    phoneNumber: "44256856"
  }
]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length +1
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=>employee.id===id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeetoUpdate = this.findOne(id);
    employeetoUpdate={
      ...employeetoUpdate,
      ...updateEmployeeDto
    }
    this.employees = this.employees.map((employee)=>{
      if (employee.id === id){
        employee = employeetoUpdate
      }
      return employee
    })
    return employeetoUpdate
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee)=> employee.id !== id);
    return this.employees;
  }
}
