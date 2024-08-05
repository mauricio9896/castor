import { PlayerService } from '../../../player/services/player.service';
import { FormControl } from '@angular/forms';
import { ResultSearch } from '../../models/resultSearch.model';
import { SpotifyService } from '../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  public resultSearch!: ResultSearch;
  public paramSearch = new FormControl('');

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.search(this.paramRandom());

    this.paramSearch.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value) {
        this.search(value);
      }
    });
  }

  search(param: string): void {
    this.spotifyService.search(param, 'track,artist,album').subscribe(
      (response: ResultSearch) => {
        this.resultSearch = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  paramRandom(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const index = Math.floor(Math.random() * letters.length);
    return letters[index];
  }
}