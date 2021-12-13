interface ReservedClaims {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

interface UserClaims extends ReservedClaims {
  id?: string;
  email?: string;
}

export { UserClaims };
