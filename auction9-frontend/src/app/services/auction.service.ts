import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  // For routes that can be accessed without signing in
  noAuthHeader = new HttpHeaders({ 'NoAuth': 'True' });


  /* getActiveAuctions - returns all auctions with active state
   * Method: GET
   * Path: /auctions */
  getActiveAuctions() {
    return this.http.get(`${environment.baseUrl}/auctions`, { responseType: 'json', headers: this.noAuthHeader }).toPromise();
  }

  /* getAuctionById - returns auction with specific ID
   * Method: GET
   * Path: /auctions/${auctionId} */
  getAuctionById(auctionId) {
    return this.http.get(`${environment.baseUrl}/auctions/${auctionId}`, { responseType: 'json' }).toPromise();
  }

  /* addAuction - creates new auction
   * Method: POST
   * Path: /auctions */
  addAuction(auction) {
    return this.http.post(`${environment.baseUrl}/auctions`, auction);
  }

  /* getAuctionBids - returns auction bids (users' bids history)
   * Method: GET
   * Path: auctions/{id}/bids */
  getAuctionBids(auctionID) {
    return this.http.get(`${environment.baseUrl}/auctions/${auctionID}/bids`, { responseType: 'json' }).toPromise();
  }

   /* getUserAuctions - returns auctions user has created
   * Method: GET
   * Path: /userAuctions */
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

   /* stopAuctionById - update status to inactive
   * Method: PUT
   * Path: /myauctions/id/stop  */
   stopAuctionById(auctionId) {
     return this.http.put(`${environment.baseUrl}/myauctions/${auctionId}/stop`, null).toPromise();
   }

   /* getMyWonAuctions - return all my won auctions for current user
   * Method: GET
   * Path: /wonauctions */
   // currently userId hard coded for testing purpose
   // after SSO is implemented, this will be updated
   getMyWonAuctions() {
     return this.http.get(`${environment.baseUrl}/wonauctions`,
     {
       responseType: 'json',
       // same as getMyAuctions hard coded user ID
       params: { userId: '2' },
     }).toPromise();
   }

   /* realizeAuctionById - update status to inactive
   * Method: PUT
   * Path: /myauctions/id
   */
   realizeAuctionById(auction, status) {
     return this.http.put(`${environment.baseUrl}/myauctions/${auction.auctionID}`, { auction, changeStatus: status }).toPromise();
   }

  /* postNewBid - create new bid for selected auction
   * Method: POST
   * Path: /auctions/id/new
   */
   createNewBid(auction, newBid) {
     return this.http.post(`${environment.baseUrl}/auctions/${auction.auctionID}/new`,
       {
         auction,
         newBid: newBid
       }).toPromise();
   }

   /* getTotalNumberOfBids - create new bid for selected auction
   * Method: GET
   * Path: /auctions/id/bidsnumber
   */
   getTotalNumberOfBids(auctionId) {
     return this.http.get(`${environment.baseUrl}/auctions/${auctionId}/bidsnumber`, { responseType: 'json' }).toPromise();
   }
}
