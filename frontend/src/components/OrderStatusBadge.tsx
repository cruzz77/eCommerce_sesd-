import React from 'react';
import { OrderStatus } from '../types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case OrderStatus.PAID:
      case OrderStatus.DELIVERED:
        return 'text-success bg-success/10 border-success/20';
      case OrderStatus.PENDING:
      case OrderStatus.SHIPPED:
        return 'text-amber-accent bg-amber-accent/10 border-amber-accent/20';
      case OrderStatus.CANCELLED:
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted bg-muted/10 border-muted/20';
    }
  };

  return (
    <span className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest border ${getStyles()}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
