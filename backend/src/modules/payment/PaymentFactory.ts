/**
 * DESIGN PATTERN: Factory
 * WHY: PaymentFactory centralises the instantiation of payment strategies.
 *      The service layer never uses `new CreditCardStrategy()` directly.
 *      It calls PaymentFactory.create(method) and receives the correct strategy.
 */
import { PaymentMethod } from '../../types';
import { PaymentStrategy } from './strategies/PaymentStrategy';
import { CreditCardStrategy } from './strategies/CreditCardStrategy';
import { UPIStrategy } from './strategies/UPIStrategy';
import { WalletStrategy } from './strategies/WalletStrategy';
import { ApiError } from '../../utils/ApiError';

export class PaymentFactory {
  private static readonly strategyMap: Record<PaymentMethod, new () => PaymentStrategy> = {
    [PaymentMethod.CREDIT_CARD]: CreditCardStrategy,
    [PaymentMethod.UPI]: UPIStrategy,
    [PaymentMethod.WALLET]: WalletStrategy,
  };

  public static create(method: PaymentMethod): PaymentStrategy {
    const StrategyClass = PaymentFactory.strategyMap[method];
    if (!StrategyClass) throw new ApiError(400, `Unsupported payment method: ${method}`);
    return new StrategyClass();
  }
}
