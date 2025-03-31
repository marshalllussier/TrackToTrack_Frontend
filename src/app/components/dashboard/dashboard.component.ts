import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Artist} from "../../models/artist.model";
import {User} from "../../models/user.model";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  profilePicture: string = '';
  topArtists: Artist[] = [];
  accessToken: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_token') || '';

    if (this.accessToken) {
      this.fetchUserProfile();
      this.fetchTopArtists()

      // Automatically refresh tokens every 50 minutes (3000 seconds)
      setInterval(() => {
        this.refreshAccessToken();
      }, 3000 * 1000);
    }
  }

  fetchUserProfile() {
    this.http.get<User>(`http://localhost:8080/api/spotify/user?access_token=${this.accessToken}`)
      .subscribe(
        (response: User) => {
          console.log('User Profile Response:', response);
          this.username = response.spotifyUsername;
          this.profilePicture = response.spotifyPfp;
          this.topArtists = response.topArtists;
        },
        (error) => console.error('Error fetching user profile', error)
      );
  }


  fetchTopArtists() {
    this.http.get(`http://localhost:8080/api/spotify/top-artists?access_token=${this.accessToken}`)
      .subscribe(
        (response: any) => {
          this.topArtists = response.items.map((artist: any) => artist.name);
        },
        (error) => console.error('Error fetching top artists', error)
      );
  }

  refreshAccessToken() {
    console.log('Attempting to refresh access token...');
    this.http.get('http://localhost:8080/api/auth/refresh')
      .subscribe(
        (response: any) => {
          try {
            const responseData = JSON.parse(response); // Ensure response is parsed
            const newAccessToken = responseData.access_token;

            if (newAccessToken) {
              console.log('New Access Token Received:', newAccessToken);
              this.accessToken = newAccessToken;
              localStorage.setItem('access_token', newAccessToken); // Update localStorage
            }
          } catch (error) {
            console.error('Error parsing refresh response:', error);
          }
        },
        (error) => console.error('Error refreshing access token', error)
      );
  }
}
