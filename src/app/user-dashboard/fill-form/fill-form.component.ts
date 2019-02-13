import {Component, Input, OnInit} from '@angular/core';
import {UserInfoService} from '../../service/User/user-info.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../service/User/user-auth.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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
  courses = ['BE/BTECH', 'ME/MTECH', 'BSC', 'MSC', 'BCA', 'MCA', 'BBA', 'MBA'];
  years = [];
  imagePreview: string;
  user = {
    refId: '',
    name: '',
    img_url: '',
    email: ''
  };
  constructor(private userInfoService: UserInfoService,
              private userAuthService: UserAuthService,
              private toster: ToasterService,
              private router: Router,
              private route: ActivatedRoute) { }
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
    phoneno: new FormControl(null, Validators.required),
    dob: new FormControl(null, Validators.required)
  });
  mode = 'Create';
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
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('edit')) {
        this.mode = 'Edit';
        console.log(this.mode);
        this.userInfoService.getUserDetails()
          .subscribe(async resp => {
            if (resp.code === 0) {
              await this.onCountry(resp.result.country._id);
              await this.onState(resp.result.state._id);
              await this.onCourse(resp.result.course);
              this.form.patchValue({
                add: resp.result.address,
                country: resp.result.country._id,
                state: resp.result.state._id,
                city: resp.result.city._id,
                zipcode: resp.result.zipcode,
                college: resp.result.college._id,
                course : resp.result.course,
                year: resp.result.year,
                parents: resp.result.parents,
                phoneno: resp.result.phoneno,
                dob: resp.result.dob,
              });
            }
          });
      } else {
        this.mode = 'Create';
      }
    });
  }
  async getUserData(refId) {
    await this.userAuthService.getUser(refId)
      .subscribe(resp => {
        this.user = resp.result;
      });
  }
  onCountry (id) {
    this.states = [];
    this.citys = [];
    this.citys = [];
    this.userInfoService.getState(id)
      .subscribe(resp => {
        this.states = resp.result;
      });
  }
  onState(id) {
    this.citys = [];
    this.userInfoService.getCity(id)
      .subscribe(resp => {
        this.citys = resp.result;
      });
  }
  onSubmit() {
    if (this.mode === 'Create') {
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
    } else if (this.mode === 'Edit') {
      if (this.form.invalid ) {
        this.toster.pop('error', 'Every Field is Required');
      } else {
        const data = this.form.getRawValue();
        this.userInfoService.updateDetails(data)
          .subscribe(resp => {
            if (resp.code === 0) {
              this.toster.pop('success', 'Details Edited Successful');
              this.router.navigate(['/user-dashboard/home']);
            }
          }, err => {
            this.toster.pop('error', 'Something Went Wrong');
          });
      }
    }
  }
  onCourse (course) {
    this.years = [];
    if (course === 'BCA' || course === 'BSC'  || course === 'MCA' || course === 'BBA') {
      this.years = ['1ST', '2ND', '3RD'];
    } else if (course === 'ME/MTECH' || course === 'MSC' || course === 'MBA') {
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
          }
        });
    }
  }

}
