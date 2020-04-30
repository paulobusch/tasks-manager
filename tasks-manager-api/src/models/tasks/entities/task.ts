import { Table, Model, Column, DataType, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, HasOne, BelongsTo } from "sequelize-typescript";
import { TaskItem } from "./task-item";
import { User } from "@models/users/entities/user";

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
    @Column({ primaryKey: true, type: DataType.STRING(8) })
    public id: string;
    
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_user: string;
    
    @ForeignKey(() => TaskItem)
    @Column({ allowNull: false, type: DataType.STRING(8) })
    public id_task_item: string;
    
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

    @BelongsTo(() => TaskItem)
    public task_item: TaskItem;

    @CreatedAt public created: Date;
    @UpdatedAt public updated: Date;
    @DeletedAt public deleted: Date;
}