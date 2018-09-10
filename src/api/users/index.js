import argon2 from 'argon2';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import Bookshelf from 'config/bookshelf';
import User from 'models/User';
import UserProfile from 'models/UserProfile';
import env from 'config/env';

const userSchema = Joi.object().keys({
  username: Joi.string().min(4).regex(/^[A-Za-z]\w*$/i).error(new Error('Username must be alphanumeric characters, starts with alphabet and at least 4 characters.')),
  email: Joi.string().email({ minDomainAtoms: 2 }).error(new Error('Email must be a valid email format ex: johndoe@vsmart.com')),
  password: Joi.string().min(6).error(new Error('Password must be at least 6 characters')),
  firstname: Joi.string().min(4).regex(/^[A-Z]+$/i).required().error(new Error('Firstname must only consists of alphabet')),
  middlename: Joi.string().min(4).regex(/^[A-Z]+$/i).error(new Error('Middlename must only consists of alphabet')),
  lastname: Joi.string().min(4).regex(/^[A-Z]+$/i).required().error(new Error('Lastname must only consists of alphabet')),
  contactNumber: Joi.string().regex(/^\d+$/).required().error(new Error('Contact number must only consists of numbers')),
  birthdate: Joi.date().required(),
  civilStatusId: Joi.number().required(),
  prcLicense: Joi.string(),
  educationalAttainmentId: Joi.number().required(),
  school: Joi.string(),
  yearsInTeaching: Joi.number(),
  designation: Joi.string()
});

export const login = async ({ username, password }, { res }) => {
  const user = await User.query({ where: { username }, orWhere: { email: username }}).fetch();
    
  if (!user) throw new Error('Invalid credentials');
  const verified = await argon2.verify(user.get('password'), password);
  
  if (!verified) throw new Error('Invalid credentials');

  const token = jwt.sign({ username: user.get('username') }, env.appSecret);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });

  return true;
};

export const register = async ({
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
}) => {

  const userData = {
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
  };
  

  // Validate raw data
  await Joi.validate(userData, userSchema);

  // Check if username exists
  const usernameExists = await User.where('username', username).fetch();
  const emailExists = await User.where('email', email).fetch();

  if (usernameExists) {
    throw new Error('Username already exists');
  }

  if (emailExists) {
    throw new Error('Email already exists');
  }

  // Save user data
  return await new Promise(resolve => {
    Bookshelf.transaction(async t => {
      try {
        const hash = await argon2.hash("password");
        const user = await User.forge({
          username,
          password: hash,
          email,
        }).save(null, { transacting: t });
        const userProfile = await UserProfile.forge({
          user_id: user.id,
          firstname,
          middlename,
          lastname,
          contact_number: contactNumber,
          birthdate,
          civil_status_id: civilStatusId,
          educational_attainment_id: educationalAttainmentId,
        }).save(null, { transacting: t });
  
        if (userProfile.id < 1) {
          t.rollback();
          resolve(false);
        }
  
        resolve(true);
      } catch(err) {
        console.error(err);
        resolve(false);
      }
    });
  });
}