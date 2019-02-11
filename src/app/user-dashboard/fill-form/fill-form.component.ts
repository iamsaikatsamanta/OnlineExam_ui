import {Component, Input, OnInit} from '@angular/core';
import {UserInfoService} from '../../service/User/user-info.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../service/User/user-auth.service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.css']
})
export class FillFormComponent implements OnInit {
  countrys = [];
  states = [];
  citys = [];
  colleges = [];
  courses = ['BE/BTECH', 'ME/MTECH', 'BSC', 'MSC', 'BCA', 'MCA'];
  years = [];
  imagePreview: string;
  user = {
    refId: '',
    name: '',
    img_url: '',
    email: ''
  };
  fileError = false;
  constructor(private userInfoService: UserInfoService,
              private userAuthService: UserAuthService,
              private toster: ToasterService, private router: Router) { }
  form = new FormGroup({
    add: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    zipcode: new FormControl(null, Validators.required),
    college: new FormControl(null, Validators.required),
    course: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    parents: new FormControl(null, Validators.required),
    phno: new FormControl(null, Validators.required),
    dob: new FormControl(null, Validators.required)
  });
  async ngOnInit() {
    const refId = this.userAuthService.getUserData().refId;
    await this.getUserData(refId);

    this.userInfoService.getCountry()
      .subscribe(resp => {
        this.countrys = resp.result;
        console.log(this.countrys);
      });
    this.userInfoService.getCollege().subscribe(resp => {
      this.colleges = resp.result;
    });
  }
  async getUserData(refId) {
    await this.userAuthService.getUser(refId)
      .subscribe(resp => {
        this.user = resp.result;
      });
  }
  onCountry (id) {
    this.citys = [];
    this.userInfoService.getState(id)
      .subscribe(resp => {
        this.states = resp.result;
      });
  }
  onState(id) {
    this.userInfoService.getCity(id)
      .subscribe(resp => {
        this.citys = resp.result;
      });
  }
  onSubmit() {
    console.log(this.form.getRawValue());
    console.log(this.user);
    if (this.form.invalid || this.user.img_url === null) {
      this.toster.pop('error', 'Every Field is Required');
    } else {
      let data = this.form.getRawValue();
      data.img_url = this.user.img_url;
      this.userInfoService.fillForm(data)
        .subscribe(resp => {
          if (resp.code === 0) {
            this.toster.pop('success', 'Details Submit Successful');
            this.router.navigate(['/user-dashboard/home']);
          }
        }, err => {
          this.toster.pop('error', 'Something Went Wrong');
        });
    }
  }
  onCourse (course) {
    this.years = [];
    if (course === 'BCA' || course === 'BSC' || course === 'MSC' || course === 'MCA') {
      this.years = ['1ST', '2ND', '3RD'];
    } else if (course === 'ME/MTECH') {
      this.years = ['1ST', '2ND'];
    } else {
      this.years = ['1ST', '2ND', '3RD', '4TH'];
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const data = new FormData();
      data.append('image', file , file.name);
      this.userInfoService.fileUpload(data)
        .subscribe(resp => {
          if (resp.code === 0) {
            this.userAuthService.userData.img_url = resp.result;
            this.user.img_url = resp.result;
            const reader = new FileReader();
            reader.onload = () => {
              this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
          }
        });
    }
  }

}
