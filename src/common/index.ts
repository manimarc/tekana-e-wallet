export enum UserStatus {
  LOCKED = 'LOCKED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Agent = 'agent',
}

export enum CurrencyUsed {
  RWA = 'RWF',
  USA = 'USD',
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum WalletTypes {
  DEPOSIT = 'DEPOSIT',
  PAYMENT = 'PAYMENT',
  TRANSFER = 'TRANSFER',
  LOAN = 'LOAN',
  WITHDRAW = 'WITHDRAW',
  FINE = 'FINE',
  CHECKS = 'CHECKS',
  BORROWING = 'BORROWING',
}
