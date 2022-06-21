import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category/category.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {icons} from "./icons"
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category-create-edit',
  templateUrl: './category-create-edit.component.html',
  styleUrls: ['./category-create-edit.component.css']
})
export class CategoryCreateEditComponent implements OnInit {

  categoryForm!: FormGroup

  pageTitle: string = 'Create new category'
  pageButtonTitle: string = "Create"

  public icons: string[] = icons

  categoryId: number | undefined
  isEdit: boolean = false

  constructor(private categoryService: CategoryService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.checkIsAdmin()
    this.generateForm()
    this.initIfEdit()
  }

  private checkIsAdmin() {
    this.authService.currentUser.subscribe((value) => {
      if (!(value.userRole == 'ADMIN')) {
        this.router.navigate(['admin/categories'])
      }
    })
  }

  private generateForm() {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
      description: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
      icon: new FormControl("", [Validators.required]),
      color: new FormControl("#00bfde")
    })
  }

  private initIfEdit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty("categoryId")) {
        this.categoryId = params["categoryId"]
        this.isEdit = true
        this.pageButtonTitle = "Save"
        this.pageTitle = "Edit category"
        this.setDataToFields(this.categoryId!)
      }
    })
  }

  setDataToFields(categoryId: number): void {
    this.categoryService.getCategory(categoryId).subscribe({
      next: (category) => {
        this.categoryForm.patchValue(category)
      },
      error: () => this.router.navigate(['/']),
    })
  }

  onCreateClick() {
    let category = this.categoryForm.value
    if (this.isEdit) {
      category.id = this.categoryId
      this.categoryService.updateCategory(this.categoryId!, category).subscribe({
        next: () => {
          this.router.navigate(['admin/categories'])
        },
        error: () => {
          this.snackBar.open('Unable to update!', 'Ok', {
            duration: 5000,
          });
        }
      })
    } else {
      this.categoryService.createCategory(category).subscribe({
        next: () => {
          this.router.navigate(['admin/categories'])
        },
        error: () => {
          this.snackBar.open('Unable to crete!', 'Ok', {
            duration: 5000,
          });
        }
      })
    }
  }

  onCancelClick() {
    this.router.navigate(['admin/categories'])
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }

  getErroredFieldClass(formControl: FormControl): string {
    return this.isFieldErrored(formControl) ? "data-input-invalid" : ''
  }

  isFieldErrored(formControl: FormControl): boolean {
    return formControl.invalid && formControl.touched
  }

  get nameControl(): FormControl {
    return this.categoryForm.get("name") as FormControl
  }

  get descriptionControl(): FormControl {
    return this.categoryForm.get("description") as FormControl
  }

  get iconControl(): FormControl {
    return this.categoryForm.get("icon") as FormControl
  }

}
