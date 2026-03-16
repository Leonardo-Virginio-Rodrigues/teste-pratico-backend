# Multi-Gateway Payment API

This project implements a RESTful API for a **multi-gateway payment system**.  
The application processes purchases and attempts to charge different payment gateways based on their **priority**.

If a gateway fails, the system automatically attempts the next available gateway.

This project was developed as part of a **backend technical challenge**.

---

# Features

- User authentication
- Role-based access control
- Product management
- Customer management
- Transaction processing
- Payment gateway integration
- Automatic gateway fallback
- Refund processing
- Multi-gateway architecture
- Dockerized environment

---

# Architecture

The system follows a modular architecture.

Client Request
↓
Transactions Controller
↓
Payment Service
↓
Gateway Service
↓
Gateway 1 / Gateway 2


### Gateway Fallback Logic

1. Retrieve **active gateways** ordered by priority
2. Attempt payment using the **highest priority gateway**
3. If the gateway fails, attempt the next gateway
4. Stop when a payment succeeds

---

# Tech Stack

- **Node.js**
- **AdonisJS**
- **MySQL**
- **Lucid ORM**
- **VineJS (validation)**
- **Docker**
- **Docker Compose**

---

# Project Structure
app/
controllers/
clients_controller.ts
gateways_controller.ts
products_controller.ts
transactions_controller.ts
users_controller.ts

models/
client.ts
gateway.ts
product.ts
transaction.ts
transaction_product.ts
user.ts

services/
payment_service.ts
gateway_service.ts

validators/

database/
migrations/
seeders/

docker-compose.yml
Dockerfile


---

# Database Schema

### Users

| Field | Type |
|-----|-----|
| id | int |
| email | string |
| password | string |
| role | enum |

---

### Gateways

| Field | Type |
|-----|-----|
| id | int |
| name | string |
| priority | int |
| is_active | boolean |

---

### Clients

| Field | Type |
|-----|-----|
| id | int |
| name | string |
| email | string |

---

### Products

| Field | Type |
|-----|-----|
| id | int |
| name | string |
| amount | decimal |
| is_active | boolean |

---

### Transactions

| Field | Type |
|-----|-----|
| id | int |
| client_id | int |
| gateway_id | int |
| external_id | string |
| status | enum |
| amount | decimal |
| card_last_numbers | string |

---

### Transaction Products

| Field | Type |
|-----|-----|
| transaction_id | int |
| product_id | int |
| quantity | int |
| unit_amount | decimal |
| total_amount | decimal |

---

# Running the Project

## Requirements

- Docker
- Docker Compose

---

# Start the project

Run the following command:

```docker compose up --build```

This command will start:
- MySQL
- API server
- Payment gateway mocks

## API URL
http://localhost:3333

## Environment Variables
Just look at the env.example file.

## Routes
### Postman Collection
The Postman collection used for testing the API is available here:
[Download Postman Collection]([./postman/multi-gateway-api.postman_collection.json](https://github.com/Leonardo-Virginio-Rodrigues/teste-pratico-backend/blob/feature/implements-docker-for-run-project/postman/test-backend.postman_collection.json))

Import the file into Postman to test all endpoints.
