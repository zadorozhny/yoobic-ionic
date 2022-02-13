import { Component, OnInit } from '@angular/core';
import { PREVIEW_IMAGE_URL } from '@/config';
import { IMovie, IMovieDetails } from '@/app/interfaces/movies';
import { MoviesService } from '@/app/shared/movies.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html'
})
export class ListPage implements OnInit {
  public PREVIEW_IMAGE_URL: string = PREVIEW_IMAGE_URL;
  private page = 1;

  constructor(private moviesService: MoviesService) { }

  get list(): Array<IMovie | IMovieDetails> {
    return this.moviesService.getList();
  }

  async ngOnInit() {
    try {
      await this.moviesService.fetchList({ page: this.page });
    } catch (err) {
      console.error(err);
    }
  }

  public async nextPage(event) {
    try {
      this.page += 1;
      await this.moviesService.fetchList({ page: this.page });
      event.target.complete();
    } catch (err) {
      console.error(err);
    }
  }
}
