import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, HasOne, BelongsTo } from "sequelize-typescript";
import { User } from "@models/users/entities/user";
import { TaskGroup } from "./task-group";

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;
    
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_user: string;
    
    @ForeignKey(() => TaskGroup)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_group: string;
    
    @Column({ allowNull: false })
    public start_time: Date;
    
    @Column
    public end_time: Date;

    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_user_created: string;
    
    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_user_updated: string;
    
    @ForeignKey(() => User)
    @Column({ type: DataType.STRING(8) })
    public id_user_deleted: string;

    @BelongsTo(() => TaskGroup)
    public task_group: TaskGroup;

    @CreatedAt public created: Date;
    @UpdatedAt public updated: Date;
    @DeletedAt public deleted: Date;
}
