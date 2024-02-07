const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const isAdmin = user.is_admin ? 1 : 0;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (pseudo, email, password, is_admin, inscription_date) VALUES (?, ?, ?, ?, ?)`,
      [user.pseudo, user.email, user.hashedPassword, isAdmin, currentDate]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select id, pseudo, email, password, inscription_date, is_admin from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select id, pseudo, email, password, inscription_date, is_admin from ${this.table}`
    );

    // Return the array of users
    return rows;
  }

  async readByEmailWithPassword(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // The D of CRUD - Delete operation
  async deleteUserAndAssociatedPhotos(id) {
    // Supprimer d'abord les photos associées à l'utilisateur
    await this.database.query(`DELETE FROM photos WHERE users_id = ?`, [id]);

    // Ensuite, supprimer l'utilisateur lui-même
    const result = await this.delete(id);

    return result;
  }

  async delete(id) {
    // Execute la requête SQL pour supprimer l'utilisateur avec l'ID spécifié
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne true si au moins une ligne a été affectée, sinon retourne false
    return result.affectedRows > 0;
  }
}

module.exports = UserManager;
