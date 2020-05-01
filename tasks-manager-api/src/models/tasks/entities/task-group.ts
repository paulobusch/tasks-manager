import { Model, Table, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, Index, ForeignKey } from "sequelize-typescript";
import { User } from "@models/users/entities/user";

@Table({ tableName: 'tasks_groups' })
export class TaskGroup extends Model<TaskGroup> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;

    @Index('idx_tasks_groups_name')
    @Column({ unique: true, allowNull: false, type: DataType.STRING(200) })
    public name: string;

    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_user_created: string;
    
    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_user_updated: string;
    
    @ForeignKey(() => User)
    @Column({ type: DataType.STRING(8) })
    public id_user_deleted: string;

    @CreatedAt public created: Date;
    @UpdatedAt public updated: Date;
    @DeletedAt public deleted: Date;
}