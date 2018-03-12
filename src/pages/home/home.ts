import { YtProvider } from './../../providers/yt/yt';
import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PlaylistPage } from '../playlist/playlist';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  playlistPage = PlaylistPage;

  channelId = 'UCEjOSbbaOfgnfRODEEMYlCw'; // FreeDawkins Channel ID
  playlists: Observable<any[]>;
 
  constructor(public navCtrl: NavController, private ytProvider: YtProvider, private alertCtrl: AlertController) { }
 
  searchPlaylists() {
    this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  }
 
  openPlaylist(id) {
    this.navCtrl.push('PlaylistPage', {id: id});
  }
}