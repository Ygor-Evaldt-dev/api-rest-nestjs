import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';

export interface ITaskRepository {
	create(dto: CreateTaskDto): Promise<void>;
	findUnique(id: number): Promise<Task | null>;
	findMany(params: {
		skip: number;
		take: number;
		userId: number;
		id?: number;
		title?: string;
		finished?: boolean;
	}): Promise<{ registers: Task[]; total: number } | null>;
	update(id: number, dto: UpdateTaskDto): Promise<void>;
	delete(id: number): Promise<void>;
}
