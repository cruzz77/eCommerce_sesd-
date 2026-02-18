```mermaid
sequenceDiagram

participant User
participant Frontend
participant OrderController
participant OrderService
participant CartService
participant ProductRepository
participant PaymentService
participant PaymentGateway
participant OrderRepository
participant InventoryService

User->>Frontend: Click "Place Order"
Frontend->>OrderController: POST /orders
OrderController->>OrderService: createOrder()
OrderService->>CartService: validateCart()
OrderService->>ProductRepository: checkStock()
OrderService->>PaymentService: processPayment()
PaymentService->>PaymentGateway: charge()
PaymentGateway-->>PaymentService: success
PaymentService-->>OrderService: paymentSuccess
OrderService->>OrderRepository: saveOrder()
OrderService->>InventoryService: reduceStock()
OrderController-->>Frontend: Order Confirmation
```