/**
 * Gerador de senhas seguras para smart locks
 */

export function generatePassword(length: number = 6): string {
  // Gerar senha numérica de 6 dígitos (padrão para smart locks)
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)).toString()
}

export function generateAlphanumericPassword(length: number = 8): string {
  // Gerar senha alfanumérica (caso necessário)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}



