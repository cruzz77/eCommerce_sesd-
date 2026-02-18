erDiagram

USER {
  string id
  string name
  string email
  string password
  string role
  string createdAt
}

CATEGORY {
  string id
  string name
  string description
}

PRODUCT {
  string id
  string name
  string description
  float price
  int stock
  string imageUrl
  string categoryId
  string createdAt
}

CART {
  string id
  string userId
  float totalPrice
  string createdAt
}

CART_ITEM {
  string id
  string cartId
  string productId
  int quantity
  float price
}

ORDER {
  string id
  string userId
  float totalAmount
  string status
  string createdAt
}

ORDER_ITEM {
  string id
  string orderId
  string productId
  int quantity
  float price
}

PAYMENT {
  string id
  string orderId
  string paymentMethod
  string paymentStatus
  string transactionId
  string createdAt
}

USER ||--|| CART : owns
USER ||--o{ ORDER : places
CATEGORY ||--o{ PRODUCT : contains
CART ||--o{ CART_ITEM : contains
PRODUCT ||--o{ CART_ITEM : added_to
ORDER ||--|{ ORDER_ITEM : includes
PRODUCT ||--o{ ORDER_ITEM : purchased_as
ORDER ||--|| PAYMENT : has
