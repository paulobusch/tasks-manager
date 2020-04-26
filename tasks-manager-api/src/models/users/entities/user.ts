import { Model, Table, Column, DataType, CreatedAt, UpdatedAt, Index } from "sequelize-typescript";
import { Property } from "@decorators/property";

@Table
export class User extends Model<User> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;

    @Index('idx_user_name')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(150) })
    public name: string;
    
    @Index('idx_user_email')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(150) })
    public email: string;
    
    @Index('idx_user_login')
    @Column({ allowNull: false, unique: true, type: DataType.STRING(50) })
    public login: string;

    @Column({ allowNull: false, type: DataType.STRING(80) })
    public password: string;
    
    @CreatedAt public created: Date;
    @UpdatedAt public updated: Date;
}