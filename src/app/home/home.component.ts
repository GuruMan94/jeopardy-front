import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";
import {GameDto} from "./dto/GameDto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Array<GameDto>;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getActiveGames().subscribe(data => {
      this.games = data;
    });
  }

}
