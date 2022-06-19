import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../services/post/post.service";
import { CategoryService } from "../../services/category/category.service";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-post-create-edit',
  templateUrl: './post-create-edit.component.html',
  styleUrls: ['./post-create-edit.component.css']
})
export class PostCreateEditComponent implements OnInit {

  postForm!: FormGroup

  private userId: number | undefined;
  postId: number | undefined
  isEdit: boolean = false

  title: string = "Create new post";
  controlButton: string = "Create"

  public categories: any[] = [];

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.generateForm();
    this.getUserId()
    this.initIfEdit()
    this.getCategories();
  }

  private generateForm() {
    this.postForm = this.formBuilder.group({
      title: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
      description: new FormControl(""),
      imageUrl: new FormControl(""),
      categoryId: new FormControl("", [Validators.required])
    })
  }

  private getUserId() {
    this.authService.currentUser.subscribe((value) => {
      this.userId = value.id
    })
  }

  private initIfEdit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty("postId")) {
        this.postId = params["postId"]
        this.isEdit = true
        this.controlButton = "Save"
        this.title = "Edit post"
        this.setDataToFields(this.postId!)
      }
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }

  setDataToFields(postId: number): void {
    this.postService.getPost(postId).subscribe({
      next: (post) => {
        post.categoryId = post.category.id
        this.postForm.patchValue(post)
      },
      error: () => this.router.navigate(['/']),
    })
  }

  public getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (v) => {
        this.categories = v.content;
      },
    });
  }

  get titleControl(): FormControl {
    return this.postForm.get("title") as FormControl
  }

  get descriptionControl(): FormControl {
    return this.postForm.get("description") as FormControl
  }

  get imageUrlControl(): FormControl {
    return this.postForm.get("imageUrl") as FormControl
  }

  get categoryControl(): FormControl {
    return this.postForm.get("categoryId") as FormControl
  }

  getErroredFieldClass(formControl: FormControl): string {
    return this.isFieldErrored(formControl) ? "data-input-invalid" : ''
  }

  isFieldErrored(formControl: FormControl): boolean {
    return formControl.invalid && formControl.touched
  }

  onCreateClick() {
    let post = this.postForm.value
    post.userId = this.userId
    if (this.isEdit) {
      this.postService.updatePost(this.postId!, post).subscribe({
        next: () => {
          this.router.navigate(['admin/posts'])
        },
        error: (e) => console.log(e)
      })
    } else {
      this.postService.createPost(post).subscribe({
        next: () => {
          this.router.navigate(['admin/posts'])
        },
        error: (e) => console.log(e)
      })
    }
  }

  onCancelClick() {
    this.router.navigate(['admin/posts'])
  }
}
