import sha256 from 'crypto-js/sha256'
export default function hashPassword(password: string) {
  return sha256(password).toString()
}
