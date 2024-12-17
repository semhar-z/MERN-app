# MERN-app

## API Endpoints
- **POST** `/api/items` - Create a new item.
  - Request Body:
    ```json
    { "name": "Item name", "description": "Item description" }
    ```
  - Response: Created item.
- **GET** `/api/items` - Get all items.
  - Response: Array of items.
- **GET** `/api/items/:id` - Get a specific item by ID.
  - Response: Item object.
- **PUT** `/api/items/:id` - Update an item.
  - Request Body: Fields to update.
  - Response: Updated item.
- **DELETE** `/api/items/:id` - Delete an item.
  - Response: Success message.
