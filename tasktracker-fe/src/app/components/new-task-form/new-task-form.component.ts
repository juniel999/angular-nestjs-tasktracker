import { Component, EventEmitter, Output, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { formsGetErrorMessages } from '../../../../utils/formsGetErrorMessages';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../../../utils/types/Task.type';

@Component({
  selector: 'app-new-task-form',
  imports: [
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

    ReactiveFormsModule,
  ],
  templateUrl: './new-task-form.component.html',
})
export class NewTaskFormComponent {
  constructor(private tasksService: TasksService) {}

  @Output() newTaskSubmitted = new EventEmitter<Task>();
  newTaskFormErrorMessages = signal('');

  newTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  onSubmit(ctx: any) {
    if (this.newTaskForm.invalid) return;

    this.tasksService
      .createUserTask({
        title: this.newTaskForm.value.title ?? '',
        description: this.newTaskForm.value.description ?? '',
      })
      .subscribe({
        next: (res) => {
          console.log('Task created:', res);
          // emit new task to parent component
          this.newTaskSubmitted.emit(res);
          ctx.close();
        },
        error: (err) => {
          console.error('Error creating task:', err);
          this.newTaskFormErrorMessages.set(
            err?.error?.message || 'Something went wrong!'
          );
        },
      });

    console.log('Submitting form:', this.newTaskForm.value);
  }

  getErrorMessage(field: string): string {
    return formsGetErrorMessages(this.newTaskForm.get(field));
  }
}
