import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  /* getActiveAuctions - returns all auctions with active state
   * Method: GET
   * Path: /auctions
   */
  getActiveAuctions() {
    return this.http.get(`${environment.baseUrl}/auctions`, { responseType: 'json' }).toPromise();
  }

  /* getAuctionById - returns auction with specific ID
   * Method: GET
   * Path: /auctions/${auctionId}
   */
  getAuctionById(auctionId) {
    return this.http.get(`${environment.baseUrl}/auctions/${auctionId}`, { responseType: 'json' }).toPromise();
  }

  /* addAuction - creates new auction
   * Method: POST
   * Path: /auctions
   */
  addAuction(auction) {
    return this.http.post(`${environment.baseUrl}/auctions`, auction);
  }

  /* getMyAuctions - return all auctions for current user
   * Method: GET
   * Path: /userAuctions
   */
   // currently userId hard coded for testing purpose
   // after SSO is implemented, this will be updated
   getUserAuctions() {
    return this.http.get(`${environment.baseUrl}/userAuctions`,
      {
        responseType: 'json',
        // currently hard coded user ID
        params: { created_by: '2' },
      }).toPromise();
  }

  /* updateArticle - updates an auction
   * Method: PUT
   * Path: /updateAuctions
   */
  updateAuction(auction) {
    return this.http.put(`${environment.baseUrl}/updateAuction`, auction);
  }
}
