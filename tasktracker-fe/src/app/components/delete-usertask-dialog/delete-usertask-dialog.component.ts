import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/brain/alert-dialog';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  // HlmAlertDialogOverlayDirective,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Task } from '../../../../utils/types/Task.type';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-delete-usertask-dialog',
  imports: [
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    // HlmAlertDialogOverlayDirective,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,

    HlmButtonDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './delete-usertask-dialog.component.html',
})
export class DeleteUsertaskDialogComponent {
  constructor(private tasksService: TasksService) {}

  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<Task>();

  onSubmit() {
    if (!this.task) return;

    this.tasksService.deleteUserTask(this.task._id).subscribe({
      next: (res) => {
        console.log('Task deleted:', res);
        this.taskDeleted.emit(res);
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      },
    });
  }
}
