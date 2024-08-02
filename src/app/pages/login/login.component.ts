import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private spotifyService: SpotifyService, private router: Router) {}


  verifyToken() {
    this.spotifyService.getToken().subscribe(token => {
      if (token) {
        this.router.navigate(['/home']);
      } else {
        alert('Token not found');
      }
    });
  }

  openLogin() {
    window.location.href = this.spotifyService.getAuthorizationSpotify();
  }
}