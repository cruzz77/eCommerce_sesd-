@startuml

entity User {
  * id : ObjectId
  --
  name : string
  email : string
  password : string
  role : string
}

entity Product {
  * id : ObjectId
  --
  name : string
  price : number
  stock : number
  category_id : ObjectId
}

entity Category {
  * id : ObjectId
  --
  name : string
}

entity Cart {
  * id : ObjectId
  --
  user_id : ObjectId
}

entity CartItem {
  * id : ObjectId
  --
  cart_id : ObjectId
  product_id : ObjectId
  quantity : number
}

entity Order {
  * id : ObjectId
  --
  user_id : ObjectId
  total_amount : number
  status : string
}

entity Payment {
  * id : ObjectId
  --
  order_id : ObjectId
  status : string
}

User ||--o{ Cart
Cart ||--o{ CartItem
Product ||--o{ CartItem
User ||--o{ Order
Order ||--|| Payment
Category ||--o{ Product

@enduml
