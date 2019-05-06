import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Resource } from 'src/app/models/resource';
import { SearchDto } from 'src/app/models/search-dto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  /**
   * This is the list of resources.
   */
  currentResourceList: Resource[];
  $currentResourceList = new Subject<Resource[]>();

  apiUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  /**
   * Methods pertaining to objects that need to be
   * shared among various components
   */

  /**
   * push an array of resources to the currentResourcesList subject
   * @param resourceList takes in an array of resources
   */
  pushNewCurrentResourceList(resourceList: Resource[]) {
    this.currentResourceList = resourceList;
    this.$currentResourceList.next(resourceList);
  }

  /**
   * Methods Pertianing to HTTP requests to the
   * Reservation service
   */

  /**
   * finds available resources based on time, building, and purpose
   * @param search an object containing building, times, and purpose
   * @returns observable with JSON data of an array of resources
   */
  getAvailableResources(search: SearchDto) {
    // Create the query to find available resources

    const campusQuery = search.campusId ? `&campusId=${search.campusId}` : '';
    const buildingQuery = search.buildingId ?  `&buildingId=${search.buildingId}` : '';

    const query = `${this.apiUrl}${environment.serviceContext.reservation}/available?startTime=${search.startTime}\
&endTime=${search.endTime}&purpose=${search.purpose}${campusQuery}${buildingQuery}`;
    // Return the get method so the component can manage the results as needed
    return this.httpClient.get<Resource[]>(query);
  }

  /**
   * Each campus object contains a list of building objects.
   * @returns an observable which is a JSON for an array of campus objects.
   */
  getCampuses() {
    let url = this.apiUrl;
    url += `${environment.serviceContext.resource}/campuses`;
    return this.httpClient.get<any[]>(url); // , { withCredentials: true }); //this was the old code, but we got a cors error

  }

  /**
  * Pass in the id of resource, there is only five resources available
  * @returns retrieves the resource specified by id passed in.
   */
  getResourceById(resourceId: number) {
    const URL = `${this.apiUrl}resources/${resourceId}`;
    return this.httpClient.get<Resource>(URL);
  }

  /**
   * There is five available resources according to the h2 database.
   * @returns a list of all available resources to the user. 
   */
  getAllResources() {
    const URL = `${this.apiUrl}resources`;
    return this.httpClient.get<Resource>(URL);
  }

  /**
  * Using two-way binding the admin can update a resource 
  * @returns returns the updated section for the block selected.
  */
  updateResource(Resource : any) {
    const URL = `${this.apiUrl}resources/${Resource.id}`;
    return this.httpClient.put<Resource>(URL, Resource);
  }
}
