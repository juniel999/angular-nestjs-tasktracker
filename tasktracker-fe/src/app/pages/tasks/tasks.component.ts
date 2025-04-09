import { Component, signal } from '@angular/core';
import { hlmH3 } from '@spartan-ng/ui-typography-helm';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { TasksService } from '../../services/tasks/tasks.service';
import { lucideFilePenLine, lucideTrash } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../../../utils/types/Task.type';
import { formsGetErrorMessages } from '../../../../utils/formsGetErrorMessages';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { Status } from '../../../../utils/enums/Status.enum';
import { NewTaskFormComponent } from '../../components/new-task-form/new-task-form.component';
import { DeleteUsertaskDialogComponent } from '../../components/delete-usertask-dialog/delete-usertask-dialog.component';

@Component({
  selector: 'app-tasks',
  imports: [
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    HlmIconDirective,
    NgIcon,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    HlmBadgeDirective,
    NewTaskFormComponent,
    DeleteUsertaskDialogComponent,
  ],
  providers: [provideIcons({ lucideFilePenLine, lucideTrash })],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  constructor(private tasksService: TasksService) {}

  tasks = signal<Task[]>([]);
  selectedTask: Task | null = null;
  hlmH3 = hlmH3;
  taskStatus = Status;
  statusOptions = Object.values(this.taskStatus); // get array of values
  editFormErrorMessages = signal('');
  statusVariantsClassMap = {
    [this.taskStatus.PENDING]:
      'text-orange-500 bg-orange-100 border-orange-500',
    [this.taskStatus.IN_PROGRESS]: 'text-blue-500 bg-blue-100  border-blue-500',
    [this.taskStatus.DONE]: 'text-green-600 bg-green-100  border-green-500',
  };

  ngOnInit(): void {
    this.tasksService.getUserTasks().subscribe({
      next: (res) => {
        console.log('User tasks:', res);
        this.tasks.set(res);
      },
      error: (err) => {
        console.error('Error getting user tasks:', err);
      },
    });
  }

  editForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    status: new FormControl('', [Validators.required]),
  });

  onSubmit(ctx: any) {
    if (this.editForm.invalid) return;

    this.tasksService
      .updateUserTask(this.selectedTask?._id || '', {
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        status: this.editForm.value.status,
      })
      .subscribe({
        next: (res) => {
          console.log('Task updated:', res);
          this.selectedTask = res;
          // update task in array after successful update for rerendering
          this.tasks.update((tasks) =>
            tasks.map((task) => (task._id === res._id ? res : task))
          );
          ctx.close();
        },
        error: (err) => {
          console.error('Error updating task:', err);
          this.editFormErrorMessages.set(
            err?.error?.message || 'Something went wrong!'
          );
          console.log('Error message:', err);
        },
      });

    console.log('Submitting form:', this.editForm.value);
  }

  handleNewTaskSubmitted(data: Task) {
    console.log('New task submitted:', data);
    this.tasks.update((tasks) => [...tasks, data]);
  }

  openEditDialog(task: Task) {
    this.selectedTask = task;

    this.editForm.setValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  getErrorMessage(field: string): string {
    return formsGetErrorMessages(this.editForm.get(field));
  }
}
