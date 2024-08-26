import crypto from 'node:crypto';

export function getHash(pass: string, salt?: string) {
  const backup = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(pass, salt || backup, 1000, 64, 'sha512').toString('hex');

  return {
    salt: salt || backup,
    hash,
  }
}