import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor() {}

  drivers = [
    'APALDETI FABIAN',
    'ASTORGA EMANUEL',
    'BURGOA CRISTIAN',
    'CASALEGNO NICOLAS',
    'CONTRERAS SERGIO',
    'ESCUDERO JON',
    'JUAREZ SANTIAGO',
    'MILLAN JONATHAN',
    'MORALES JULIO',
    'OROZCO DIEGO',
    'VIDELA CLAUDIO',
  ];
  inCharges = [
    'ROMANO NICOLAS',
    'ESCUDERO JON',
    'JUAREZ SANTIAGO',
    'CUERVO FERNANDO',
  ];
  trucks = [
    'AD 721 CG',
    'AD 721 CF',
    'AD 832 BO',
    'AF 730 XK',
    'GPP 127',
    'GLU 907',
  ];
  departaments = [
    'CAPITAL',
    'LUJAN DE CUYO',
    'PARQUE',
    'VIALIDAD',
    'CAPITAL/PARQUE',
    'PARQUE/VIALIDAD',
  ];
  electricians = [
    'ASTORGA EMANUEL',
    'ASTORGA RICARDO',
    'BURGOA CRISTIAN',
    'CASALEGNO NICOLAS',
    'DIAZ NICOLAS',
    'GONZALEZ JONATHAN',
    'JUAREZ SANTIAGO',
    'LUCERO EDUARDO',
    'MONTAÑA EDUARDO',
    'SALCEDO AGUSTIN',
    'VALERA LUCAS',
    'ZABALA EDUARDO',
  ];

  getDrivers() {
    return this.drivers;
  }

  getElectricians() {
    return this.electricians;
  }

  getInCharge() {
    return this.inCharges;
  }
  getTrucks() {
    return this.trucks;
  }

  getDepartaments() {
    return this.departaments;
  }
}
