import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@/app/shared/movies.service';
import { ORIGIN_IMAGE_URL } from '@/config';
import { IMovie, IMovieDetails } from '@/app/interfaces/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './details.page.html'
})
export class DetailsPage implements OnInit {
  public ORIGIN_IMAGE_URL: string = ORIGIN_IMAGE_URL;
  private id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  get details(): IMovie | IMovieDetails {
    return this.moviesService.getDetails(this.id);
  }

  async ngOnInit() {
    try {
      if (!this.details) {
        await this.moviesService.fetchDetails({ id: this.id });
      }
    } catch (err) {
      console.error(err);
    }
  }

}
