import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ScrollService} from "../services/scroll.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  errorMessage: string = '';
  title: string = 'Track To Track';
  selectedImage: string = '';
  private bannerImages = [...Array.from({ length: 11 }, (v, k) => `assets/images/banners/banner${k + 1}.jpg`), 'assets/images/banners/banner.png'];


  constructor(private router: Router, private route: ActivatedRoute, private scrollService : ScrollService) {
    this.selectRandomImage()
  }

  ngOnInit() {
    this.handleScroll()
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      console.log('Access Token:', accessToken);

      // Save the access token to localStorage
      localStorage.setItem('access_token', accessToken);

      // Navigate to the dashboard
      this.router.navigate(['/dashboard']);
    }

    // Check if there's an error query parameter
    const error = this.route.snapshot.queryParamMap.get('error');
    if (error) {
      this.displayErrorMessage(error);
    }
  }

  loginWithSpotify() {
    window.location.href = 'http://localhost:8080/api/auth/login';
  }

  displayErrorMessage(message: string) {
    this.errorMessage = message;

    // Automatically clear the error message after 3 seconds
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }


  handleScroll() {
    this.scrollService.scrollObservable.subscribe(targetElement => {
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const topPosition = window.pageYOffset + rect.top;

        window.scrollTo({
          top: topPosition - 75,
          behavior: 'smooth'
        });
      }
    });
  }

  selectRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.bannerImages.length);
    this.selectedImage = this.bannerImages[randomIndex];
  }
}
