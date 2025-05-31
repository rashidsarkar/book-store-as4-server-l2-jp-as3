/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import config from '../config';

const createToken = (jwtPayload: any) => {
  jwt.sign(jwtPayload, config.jwt_refresh_secret as string, {
    expiresIn: '30d',
  });
};
console.log(createToken);
