import { login, register } from 'api/users';

export default {
  Mutation: {
    login: (_, { username, password }, ctx ) => login({ username, password }, ctx),
    register: (_, {
      username, 
      password,
      email,
      firstname,
      middlename,
      lastname,
      contactNumber,
      birthdate,
      civilStatusId,
      prcLicense,
      educationalAttainmentId,
      school,
      yearsInTeaching,
      designation
    }) => register({
      username, 
      password,
      email,
      firstname,
      middlename,
      lastname,
      contactNumber,
      birthdate,
      civilStatusId,
      educationalAttainmentId,
      prcLicense,
      school,
      yearsInTeaching,
      designation
    })
  }
}